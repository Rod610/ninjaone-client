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
  setDevice: (device: IDevice | null) => void;
  editDevice: (id: string, device: IDeviceForm) => Promise<void>;
  getDevice: (id: string) => Promise<void>;
  deleteDevice: (id: string) => Promise<void>;
}

export type IDeviceModalInitialState = Pick<
  IDeviceModalContext,
  "isFetchingDevice" | "isEditing" | "isDeleting" | "device"
>;

export type Action =
  | { type: "FETCHING_DEVICE"; payload: boolean }
  | { type: "EDITING_DEVICE"; payload: boolean }
  | { type: "DELETING_DEVICE"; payload: boolean }
  | { type: "SET_DEVICE"; payload: IDevice | null };
