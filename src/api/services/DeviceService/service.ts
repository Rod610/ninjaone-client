import { HTTP_METHODS } from "../../../constants/httpMethods";
import { IDevice, IDeviceForm } from "../../../types/devices.types";
import { axiosClient } from "../../axiosBaseQuery";

import { DeviceEnpoints } from "./config";

export default class DeviceService {
  public static readonly getDevices = (): Promise<{ data: IDevice[] }> => {
    return axiosClient({
      url: DeviceEnpoints.getDevices(),
      method: HTTP_METHODS.GET
    });
  };

  public static readonly getDeviceById = (id: string): Promise<{ data: IDevice }> => {
    return axiosClient({
      url: DeviceEnpoints.getDevice(id),
      method: HTTP_METHODS.GET
    });
  };

  public static readonly postDevices = (data: IDeviceForm): Promise<IDevice> => {
    return axiosClient({
      url: DeviceEnpoints.postDevices(),
      method: HTTP_METHODS.POST,
      data
    });
  };

  public static readonly putDevices = (id: string, data: IDeviceForm): Promise<IDevice> => {
    return axiosClient({
      url: DeviceEnpoints.putDevice(id),
      method: HTTP_METHODS.PUT,
      data
    });
  };

  public static readonly deleteDevices = (id: string): Promise<IDevice> => {
    return axiosClient({
      url: DeviceEnpoints.deleteDevice(id),
      method: HTTP_METHODS.DELETE
    });
  };
}
