import { IDevice } from "../types/devices.types";

export const mapDevices = (devices: IDevice[]) => {
  return devices.map((device: IDevice) => ({
    ...device,
    hdd_capacity: Number(device.hdd_capacity),
  }));
};
