import { useShallow } from "zustand/shallow";

import { useDeviceDataTableStore } from "../state/deviceDataTableStore";
import { IDevicesTypeOption, ISortOption } from "../types/devices.types";

export const useDeviceDataTable = () => {
  const { search, deviceType, sortOption, setSearch, setDeviceType, setSortOption } = useDeviceDataTableStore(useShallow(
    (state) => ({
      search: state.search,
      deviceType: state.deviceType,
      sortOption: state.sortOption,
      setSearch: state.setSearch,
      setDeviceType: state.setDeviceType,
      setSortOption: state.setSortOption
    }))
  );

  return {
    search,
    deviceType,
    sortOption,
    setSearch: (value: string) => setSearch(value),
    setDeviceType: (type: IDevicesTypeOption) => setDeviceType(type),
    setSortOption: (option: ISortOption) => setSortOption(option)
  };
};
