import { configureStore } from "@reduxjs/toolkit";

import devicesReducer from "./device/deviceSlice";
import deviceDataTableReducer from "./deviceDataTable/deviceDataTableSlice";

export const store = configureStore({
  reducer: {
    devices: devicesReducer,
    deviceDataTable: deviceDataTableReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;               