import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { DeviceDataTableProvider } from "./context/DeviceDataTableContext.tsx";
import App from "./App.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DeviceDataTableProvider>
      <App />
    </DeviceDataTableProvider>
  </StrictMode>
);
