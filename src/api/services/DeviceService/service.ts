import { IDevice, IDeviceForm } from "../../../types/devices.types";
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
export const postDevices = async (data: IDeviceForm, { signal }: { signal?: AbortSignal }) => {
  return await httpClient<IDeviceForm, IDevice>(DeviceEnpoints.postDevices(), {
    method: HTTP_METHODS.POST,
    body: data,
    signal
  });
};
export const putDevices = async (id: string, data: IDeviceForm, { signal }: { signal?: AbortSignal }) => {
  return await httpClient<IDeviceForm, IDevice>(DeviceEnpoints.putDevice(id), {
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
