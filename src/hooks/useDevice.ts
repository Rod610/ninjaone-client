import { useCallback } from "react";
import { useShallow } from "zustand/shallow";

import { useDeviceStore } from "../state/deviceStore";
import { DeviceForm } from "../types/devices.types";
import { mapDevices } from "../utils/mapDevices";

export const useDevice = () => {
  const { isFetching, isAdding, data, fetchDevices, addDevice } = useDeviceStore(
    useShallow((state) => ({
      isFetching: state.isFetching,
      isAdding: state.isAdding,
      data: state.data,
      fetchDevices: state.fetchDevices,
      addDevice: state.addDevice
    }))
  );

  const refetch = useCallback(
    (signal?: AbortSignal) => {
      fetchDevices(signal);
    },
    [fetchDevices]
  );

  const add = useCallback(
    (device: DeviceForm, { signal }: { signal?: AbortSignal }) => addDevice(device, signal),
    [addDevice]
  );

  return {
    isFetching,
    isAdding,
    data: mapDevices(data),
    refetch,
    addDevice: add
  };
};
