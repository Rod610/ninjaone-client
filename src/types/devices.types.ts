export enum deviceType {
  Windows = "WINDOWS",
  Mac = "MAC",
  Linux = "LINUX",
  None = "",
}

export interface IDeviceForm {
  system_name: string;
  type: deviceType;
  hdd_capacity: string | number;
}

export interface IDevice {
  id: string;
  system_name: string;
  type: deviceType;
  hdd_capacity: string | number;
}

export type sortOption = {
  id: number;
  propertyLabel: string;
  propertyName: string;
  orderLabel: string;
  orderValue: string;
};