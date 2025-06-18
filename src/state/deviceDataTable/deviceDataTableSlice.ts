import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { devicesTypes } from "../../constants/devicesTypes";
import { DeviceDataTableState, IDevicesTypeOption, ISortOption } from "../../types/devices.types";
import { generateSortOptions } from "../../utils/generateSortOptions";

const sortOptions = generateSortOptions();

const initialState: DeviceDataTableState = {
  search: "",
  deviceType: devicesTypes[0],
  sortOption: sortOptions[0]
};

const deviceDataTableSlice = createSlice({
  name: "deviceDataTable",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setDeviceType: (state, action: PayloadAction<IDevicesTypeOption>) => {
      state.deviceType = action.payload;
    },
    setSortOption: (state, action: PayloadAction<ISortOption>) => {
      state.sortOption = action.payload;
    }
  }
});

export const { setSearch, setDeviceType, setSortOption } = deviceDataTableSlice.actions;

export default deviceDataTableSlice.reducer;
