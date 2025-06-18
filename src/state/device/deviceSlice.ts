import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getDevices, postDevices } from "../../api/services/DeviceService/service";
import { IDevice, DeviceForm } from "../../types/devices.types";

interface DeviceState {
  isFetching: boolean;
  isAdding: boolean;
  data: IDevice[];
  error: string | null;
}

const initialState: DeviceState = {
  isFetching: false,
  isAdding: false,
  data: [],
  error: null
};

export const fetchDevices = createAsyncThunk<IDevice[], { signal?: AbortSignal }, { rejectValue: string }>(
  "device/fetchDevices",
  async (_, { rejectWithValue, signal }) => {
    try {
      const data = await getDevices({
        signal
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message || "Failed to fetch devices" : "An unknown error occurred."
      );
    }
  }
)

export const addDevice = createAsyncThunk<void, DeviceForm, { rejectValue: string }>(
  "device/addDevice",
  async (device, { dispatch, signal }) => {
    await postDevices(device, {
      signal
    });

    await dispatch(fetchDevices({ signal }));
  }
);

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch devices
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = action.payload;
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload || "Error fetching devices";
      })

      // Add device
      .addCase(addDevice.pending, (state) => {
        state.isAdding = true;
        state.error = null;
      })
      .addCase(addDevice.fulfilled, (state) => {
        state.isAdding = false;
      })
      .addCase(addDevice.rejected, (state, action) => {
        state.isAdding = false;
        state.error = action.payload || "Error adding device";
      });
  }
});

export default deviceSlice.reducer;
