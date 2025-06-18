import { DeviceForm,IDevice } from "../../../types/devices.types";
import { httpClient } from "../../fetchClient";

import { DeviceEnpoints } from "./config";

export const HTTP_METHODS = {
  GET: "GET" as const,
  POST: "POST" as const,
  PUT: "PUT" as const,
  DELETE: "DELETE" as const
};

export const getDevices = async ({ signal }: { signal?: AbortSignal }) => {
  return await httpClient<IDevice[], IDevice[]>(DeviceEnpoints.getDevices(), {
    method: HTTP_METHODS.GET,
    signal
  });
};
export const getDeviceById = async (id: string, { signal }: { signal?: AbortSignal }) => {
  return await httpClient<IDevice, IDevice>(DeviceEnpoints.getDevice(id), {
    method: HTTP_METHODS.GET,
    signal
  });
};
export const postDevices = async (data: DeviceForm, { signal }: { signal?: AbortSignal }) => {
  return await httpClient<DeviceForm, IDevice>(DeviceEnpoints.postDevices(), {
    method: HTTP_METHODS.POST,
    body: data,
    signal
  });
};
export const putDevices = async (id: string, data: DeviceForm, { signal }: { signal?: AbortSignal }) => {
  return await httpClient<DeviceForm, IDevice>(DeviceEnpoints.putDevice(id), {
    method: HTTP_METHODS.PUT,
    body: data,
    signal
  });
};
export const deleteDevices = async (id: string, { signal }: { signal?: AbortSignal }) => {
  return await httpClient<IDevice, IDevice>(DeviceEnpoints.deleteDevice(id), {
    method: HTTP_METHODS.DELETE,
    signal
  });
};
