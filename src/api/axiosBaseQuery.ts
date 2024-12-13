import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_DEVICES_TASK_API_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    // eslint-disable-next-line no-useless-escape
    timezone: new Date().toString().match(/([-\+][0-9]+)\s/)![1]
  }
});

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig<unknown> => {
  console.log(`[request] [${JSON.stringify(config)}]`);
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);

  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> | AxiosInstance => {
  console.error(`[response error] [${error.response?.data}]`, error.response?.data);

  return Promise.reject(error.response?.data);
};

axiosClient.interceptors.request.use(onRequest, onRequestError);

axiosClient.interceptors.response.use(onResponse, onResponseError);

export { axiosClient };
