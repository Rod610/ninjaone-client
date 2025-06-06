export enum deviceType {
  Windows = "WINDOWS",
  Mac = "MAC",
  Linux = "LINUX",
  None = ""
}

export type IDeviceForm = Omit<IDevice, "id">;
export interface IDevice {
  id: string;
  system_name: string;
  type: deviceType;
  hdd_capacity: string | number;
}

export interface IDevicesType {
  id: number;
  name: string;
  value: string;
}

export interface ISortOption {
  id: string;
  propertyLabel: string;
  propertyName: string;
  orderLabel: string;
  orderValue: string;
}

export type DeviceProperty = Pick<ISortOption, "propertyLabel" | "propertyName">;

export type DeviceModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  device: IDevice;
};