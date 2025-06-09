import { createContext, FC, ReactNode, useCallback, useMemo, useRef, useState } from "react";

import { deleteDevices, getDeviceById, putDevices } from "../api/services/DeviceService/service";
import { IDevice, IDeviceForm } from "../types/devices.types";
import { resetAbortController } from "../utils/abortController";

import { IDeviceModalContext } from "./types";

const DeviceModalContext = createContext<IDeviceModalContext | undefined>(undefined);

export const DeviceModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isFetchingDevice, setIsFetchingDevice] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [device, setDevice] = useState<IDevice | null>(null);

  const fetchControllerRef = useRef<AbortController | null>(null);
  const editControllerRef = useRef<AbortController | null>(null);
  const deleteControllerRef = useRef<AbortController | null>(null);

  const editDevice = useCallback(async (id: string, device: IDeviceForm) => {

    const controller = resetAbortController(editControllerRef);

    try {
      setIsEditing(true);

      await putDevices(id, device, {
        signal: controller.signal
      });
    } finally {
      setIsEditing(false);
    }
  }, []);

  const deleteDevice = useCallback(async (id: string) => {
    const controller = resetAbortController(deleteControllerRef);

    try {
      setIsDeleting(true);
      setDevice(null);

      await deleteDevices(id, {
        signal: controller.signal
      });
    } finally {
      setIsDeleting(false);
    }
  }, []);

  const getDevice = useCallback(async (id: string) => {
    const controller = resetAbortController(fetchControllerRef);

    try {
      setIsFetchingDevice(false);
      setDevice(null);

      const data = await getDeviceById(id, {
        signal: controller.signal
      });

      setDevice(data);
    } finally {
      setIsFetchingDevice(true);
    }
  }, []);

  const value = useMemo(
    () => ({
      isFetchingDevice,
      isEditing,
      isDeleting,
      device,
      setDevice,
      getDevice,
      editDevice,
      deleteDevice
    }),
    [isFetchingDevice, isDeleting, isEditing, device, setDevice, getDevice, editDevice, deleteDevice]
  );

  return <DeviceModalContext.Provider value={value}>{children}</DeviceModalContext.Provider>;
};

export default DeviceModalContext;
