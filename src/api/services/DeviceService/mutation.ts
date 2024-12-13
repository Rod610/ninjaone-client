import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { GET_ALL_DEVICES } from "../../../constants/queryKeys";
import { IDevice, IDeviceForm } from "../../../types/devices.types";
import { queryClient } from "../../queryClient";

import DeviceService from "./service";

export const useAddDevice = (): UseMutationResult<IDevice, Error, IDeviceForm, unknown> => {
  return useMutation({
    mutationFn: (data: IDeviceForm) => DeviceService.postDevices(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_DEVICES],
      });
    },
  });
};

export const useDeleteDevice = (): UseMutationResult<IDevice, Error, string, unknown> => {
  return useMutation({
    mutationFn: (id: string) => DeviceService.deleteDevices(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_DEVICES],
      });
    },
  });
};
