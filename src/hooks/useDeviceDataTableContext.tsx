import { useContext } from "react";

import DeviceDataTableContext from "../context/DeviceDataTableContext";

const useDeviceDataTableContext = () => {
  const context = useContext(DeviceDataTableContext);

  if (!context) {
    throw new Error("DeviceDataTableContext must be used within a DeviceDataTableProvider");
  }

  return context;
};

export default useDeviceDataTableContext;
