import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addDevice, fetchDevices } from "../state/device/deviceSlice";
import { AppDispatch, RootState } from "../state/store";
import { IDeviceForm } from "../types/devices.types";
import { mapDevices } from "../utils/mapDevices";

export const useDevice = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isFetching, isAdding, data } = useSelector((state: RootState) => state.devices);

  const refetch = useCallback(
    (signal?: AbortSignal) => {
      dispatch(fetchDevices({ signal }));
    },
    [dispatch]
  );

  return {
    isFetching,
    isAdding,
    data: mapDevices(data),
    refetch,
    addDevice: (device: IDeviceForm, { signal }: { signal?: AbortSignal }) => dispatch(addDevice(device, { signal }))
  };
};
