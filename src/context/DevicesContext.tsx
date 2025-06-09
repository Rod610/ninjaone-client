import { createContext, FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getDevices, postDevices } from "../api/services/DeviceService/service";
import { IDevice, IDeviceForm } from "../types/devices.types";
import { resetAbortController } from "../utils/abortController";
import { mapDevices } from "../utils/mapDevices";

import { IDevicesContext } from "./types";

const DevicesContext = createContext<IDevicesContext | undefined>(undefined);

export const DevicesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const [data, setData] = useState<IDevice[]>([]);

  const fetchControllerRef = useRef<AbortController | null>(null);
  const addControllerRef = useRef<AbortController | null>(null);

  const getAllDevices = useCallback(async () => {
    const controller = resetAbortController(fetchControllerRef);

    try {
      setIsFetching(true);

      const data = await getDevices({
        signal: controller.signal
      });
      setData(data);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const addDevice = useCallback(
    async (device: IDeviceForm) => {
      const controller = resetAbortController(addControllerRef);
      try {
        setIsAdding(true);

        await postDevices(device, {
          signal: controller.signal
        });
        await getAllDevices();
      } finally {
        setIsAdding(false);
      }
    },
    [getAllDevices]
  );

  useEffect(() => {
    getAllDevices();

    const controller = fetchControllerRef.current;
    return () => {
      controller?.abort();
    };
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
