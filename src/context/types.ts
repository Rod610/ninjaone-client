import { sortOption } from "../types/devices.types";

type devicesType = {
  id: number;
  name: string;
  value: string;
};

export interface IDeviceDataTableContext {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  deviceType: devicesType;
  setDeviceType: React.Dispatch<React.SetStateAction<devicesType>>;
  sortOption: sortOption;
  setSortOption: React.Dispatch<React.SetStateAction<sortOption>>;
}
