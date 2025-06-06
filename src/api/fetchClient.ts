const BASE_URL = import.meta.env.VITE_APP_DEVICES_TASK_API_URL;

if (!BASE_URL) {
  throw new Error("VITE_APP_DEVICES_TASK_API_URL is not defined in your environment variables.");
}

export type RequestConfig<TRequest = undefined> = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: TRequest;
  signal?: AbortSignal;
  params?: Record<string, string | number | boolean>;
  timeout?: number;
};

type FetchInterceptor = {
  onRequest?: <TRequest>(url: string, config: RequestConfig<TRequest>) => [string, RequestConfig<TRequest>];
  onRequestError?: (error: unknown) => void;
  onResponse?: <TResponse>(response: Response) => Promise<TResponse>;
  onResponseError?: (error: unknown) => void;
};

const interceptors: FetchInterceptor = {
  onRequest: (url, config) => {
    return [url, config];
  },
  onRequestError: (error) => {
    console.error(`[request error]`, error);
  },
  onResponse: async <T>(response: Response): Promise<T> => {
    return await response.json();
  },
  onResponseError: (error) => {
    console.error(`[response error]`, error);
  }
};

const httpClient = async <TRequest, TResponse>(
  endpoint: string,
  config: RequestConfig<TRequest> = {}
): Promise<TResponse> => {
  const { method = "GET", headers = {}, signal, params, timeout = 10000 } = config;

  let url = `${BASE_URL}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    for (const key in params) {
      searchParams.append(key, String(params[key]));
    }
    url += `?${searchParams.toString()}`;
  }

  let finalConfig: RequestConfig<TRequest> = {
    ...config,
    method,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      ...headers
    }
  };

  try {
    if (interceptors.onRequest) {
      [url, finalConfig] = interceptors.onRequest(url, finalConfig);
    }

    // Combine user signal and timeout signal if both are provided
    let combinedSignal: AbortSignal | undefined = undefined;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    if (signal) {
      if ("any" in AbortSignal) {
        combinedSignal = AbortSignal.any([signal, controller.signal]);
      } else {
        combinedSignal = controller.signal;
      }
    } else {
      combinedSignal = controller.signal;
    }

    // Create the request options
    const requestOptions: RequestInit = {
      method: finalConfig.method,
      headers: new Headers(finalConfig.headers),
      signal: combinedSignal
    };

    if (finalConfig.body && finalConfig.method !== "GET") {
      requestOptions.body = JSON.stringify(finalConfig.body);
    }

    // Fetch the response
    const response = await fetch(url, requestOptions);
    clearTimeout(timeoutId);

    // Check for HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Call the onResponse interceptor
    return interceptors.onResponse ? await interceptors.onResponse<TResponse>(response) : await response.json();
  } catch (error) {
    // Call the onRequestError or onResponseError interceptor
    if (error instanceof Error) {
      interceptors.onRequestError?.(error);
      interceptors.onResponseError?.(error);
    }

    return Promise.reject(error);
  }
};

export { httpClient };
