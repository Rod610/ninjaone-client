import { configureStore } from "@reduxjs/toolkit";

import devicesReducer from "./device/deviceSlice";
import deviceDataTableReducer from "./deviceDataTable/deviceDataTableSlice";
import deviceModalsReducer from "./deviceModals/deviceModalsSlice";

export const store = configureStore({
  reducer: {
    devices: devicesReducer,
    deviceDataTable: deviceDataTableReducer,
    deviceModals: deviceModalsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;               