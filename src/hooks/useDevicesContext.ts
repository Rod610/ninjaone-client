import { useContext } from "react";

import DevicesContext from "../context/DevicesContext";

const useDevicesContext = () => {
  const context = useContext(DevicesContext);

  if (!context) {
    throw new Error("DevicesContext must be used within a DevicesProvider");
  }

  return context;
};

export default useDevicesContext;
