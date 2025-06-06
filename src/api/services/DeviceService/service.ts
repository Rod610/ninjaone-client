import { IDevice, IDeviceForm } from "../../../types/devices.types";
import { httpClient } from "../../fetchClient";

import { DeviceEnpoints } from "./config";

export const HTTP_METHODS = {
  GET: "GET" as const,
  POST: "POST" as const,
  PUT: "PUT" as const,
  DELETE: "DELETE" as const
};

export const getDevices = async () => {
  return await httpClient<IDevice[], IDevice[]>(DeviceEnpoints.getDevices(), {
    method: HTTP_METHODS.GET
  });
};
export const getDeviceById = async (id: string) => {
  return await httpClient<IDevice, IDevice>(DeviceEnpoints.getDevice(id), {
    method: HTTP_METHODS.GET
  });
};
export const postDevices = async (data: IDeviceForm) => {
  return await httpClient<IDeviceForm, IDevice>(DeviceEnpoints.postDevices(), {
    method: HTTP_METHODS.POST,
    body: data
  });
};
export const putDevices = async (id: string, data: IDeviceForm) => {
  return await httpClient<IDeviceForm, IDevice>(DeviceEnpoints.putDevice(id), {
    method: HTTP_METHODS.PUT,
    body: data
  });
};
export const deleteDevices = async (id: string) => {
  return await httpClient<IDevice, IDevice>(DeviceEnpoints.deleteDevice(id), {
    method: HTTP_METHODS.DELETE
  });
};
