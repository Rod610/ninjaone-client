import { createContext, FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import { getDevices, postDevices } from "../api/services/DeviceService/service";
import { IDevice, IDeviceForm } from "../types/devices.types";
import { mapDevices } from "../utils/mapDevices";

import { IDevicesContext } from "./types";

const DevicesContext = createContext<IDevicesContext | undefined>(undefined);

export const DevicesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const [data, setData] = useState<IDevice[]>([]);

  const getAllDevices = useCallback(async () => {
    try {
      setIsFetching(true);

      const data = await getDevices();
      setData(data);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const addDevice = useCallback(
    async (device: IDeviceForm) => {
      try {
        setIsAdding(true);

        await postDevices(device);
        await getAllDevices();
      } finally {
        setIsAdding(false);
      }
    },
    [getAllDevices]
  );

  useEffect(() => {
    getAllDevices();
  }, [getAllDevices]);

  const value = useMemo(
    () => ({
      isFetching,
      isAdding,
      data: mapDevices(data),
      refetch: getAllDevices,
      addDevice
    }),
    [isFetching, isAdding, data, getAllDevices, addDevice]
  );

  return <DevicesContext.Provider value={value}>{children}</DevicesContext.Provider>;
};

export default DevicesContext;
