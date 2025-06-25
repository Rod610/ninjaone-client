import { create } from "zustand";

import { devicesTypes } from "../constants/devicesTypes";
import { DeviceDataTableState, IDevicesTypeOption, ISortOption } from "../types/devices.types";
import { generateSortOptions } from "../utils/generateSortOptions";

interface DeviceDataTableStore extends DeviceDataTableState {
  setSearch: (search: string) => void;
  setDeviceType: (deviceType: IDevicesTypeOption) => void;
  setSortOption: (sortOption: ISortOption) => void;
}

const sortOptions = generateSortOptions();

export const useDeviceDataTableStore = create<DeviceDataTableStore>((set) => ({
  search: "",
  deviceType: devicesTypes[0],
  sortOption: sortOptions[0],
  setSearch: (search: string) => set({ search }),
  setDeviceType: (deviceType: IDevicesTypeOption) => set({ deviceType }),
  setSortOption: (sortOption: ISortOption) => set({ sortOption })
}));
