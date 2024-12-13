import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClient } from "./api/queryClient.ts";
import { DeviceDataTableProvider } from "./context/DeviceDataTableContext.tsx";
import App from "./App.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <DeviceDataTableProvider>
        <App />
      </DeviceDataTableProvider>
    </QueryClientProvider>
  </StrictMode>
);
