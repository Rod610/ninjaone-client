import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { GET_ALL_DEVICES, GET_DEVICE } from "../../../constants/queryKeys";
import { IDevice, IDeviceForm } from "../../../types/devices.types";
import { queryClient } from "../../queryClient";

import DeviceService from "./service";

const onSuccess = () => {
  queryClient.invalidateQueries({
    queryKey: [GET_ALL_DEVICES]
  });
};

export const useAddDevice = (): UseMutationResult<IDevice, Error, IDeviceForm, unknown> => {
  return useMutation({
    mutationFn: async (data: IDeviceForm) => DeviceService.postDevices(data),
    onSuccess
  });
};

export const useDeleteDevice = (): UseMutationResult<IDevice, Error, string, unknown> => {
  return useMutation({
    mutationFn: async (id: string) => DeviceService.deleteDevices(id),
    onSuccess
  });
};

export const useEditDevice = (): UseMutationResult<IDevice, Error, { id: string; data: IDeviceForm }, unknown> => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: IDeviceForm }) => DeviceService.putDevices(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_DEVICES]
      });
      queryClient.invalidateQueries({
        queryKey: [GET_DEVICE]
      });
    }
  });
};
