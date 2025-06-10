import { useDispatch, useSelector } from "react-redux";

import { setDeviceType, setSearch, setSortOption } from "../state/deviceDataTable/deviceDataTableSlice";
import { RootState } from "../state/store";
import { IDevicesType, ISortOption } from "../types/devices.types";

export const useDeviceDataTable = () => {
  const dispatch = useDispatch();

  const { search, deviceType, sortOption } = useSelector((state: RootState) => state.deviceDataTable);

  return {
    search,
    deviceType,
    sortOption,
    setSearch: (value: string) => dispatch(setSearch(value)),
    setDeviceType: (type: IDevicesType) => dispatch(setDeviceType(type)),
    setSortOption: (option: ISortOption) => dispatch(setSortOption(option))
  };
};
