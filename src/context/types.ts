import { IDevice, IDeviceForm, IDevicesType, ISortOption } from "../types/devices.types";

export interface IDeviceDataTableContext {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  deviceType: IDevicesType;
  setDeviceType: React.Dispatch<React.SetStateAction<IDevicesType>>;
  sortOption: ISortOption;
  setSortOption: React.Dispatch<React.SetStateAction<ISortOption>>;
}

export interface IDevicesContext {
  isFetching: boolean;
  isAdding: boolean;
  data: IDevice[];
  refetch: () => Promise<void>;
  addDevice: (device: IDeviceForm) => Promise<void>;
}

export interface IDeviceModalContext {
  isFetchingDevice: boolean;
  isEditing: boolean;
  isDeleting: boolean;
  device: IDevice | null;
  setDevice: React.Dispatch<React.SetStateAction<IDevice | null>>;
  editDevice: (id: string, device: IDeviceForm) => Promise<void>;
  getDevice: (id: string) => Promise<void>;
  deleteDevice: (id: string) => Promise<void>;
}
