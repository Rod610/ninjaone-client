import { useContext } from "react";

import DeviceModalContext from "../context/DeviceModalContext";

const useDeviceModalContext = () => {
  const context = useContext(DeviceModalContext);

  if (!context) {
    throw new Error("DeviceModalContext must be used within a DeviceModalProvider");
  }

  return context;
};

export default useDeviceModalContext;
