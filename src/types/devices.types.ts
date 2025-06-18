import { IModalBase } from "./components.types";

export enum DeviceType {
  Windows = "WINDOWS",
  Mac = "MAC",
  Linux = "LINUX",
  None = "NONE"
}

export interface BaseDevice {
  system_name: string;
  type: DeviceType;
  hdd_capacity: number;
}
export interface IDevice extends BaseDevice {
  id: string;
}

export type DeviceForm = BaseDevice;

export interface IDevicesTypeOption {
  id: number;
  name: string;
  value: DeviceType;
}

export interface ISortOption {
  id: string;
  propertyLabel: string;
  propertyName: string;
  orderLabel: string;
  orderValue: string;
}

export type DeviceProperty = Pick<ISortOption, "propertyLabel" | "propertyName">;

export interface DeviceModalProps extends IModalBase {
  device?: IDevice | null;
}

export interface DeviceDataTableState {
  search: string;
  deviceType: IDevicesTypeOption;
  sortOption: ISortOption;
}
