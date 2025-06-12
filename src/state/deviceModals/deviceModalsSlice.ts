import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { deleteDevices, getDeviceById, putDevices } from "../../api/services/DeviceService/service";
import { IDevice, IDeviceForm } from "../../types/devices.types";
import { fetchDevices } from "../device/deviceSlice";

interface DeviceModalsState {
  isFetchingDevice: boolean;
  isEditing: boolean;
  isDeleting: boolean;
  device: IDevice | null;
  error: string | null;
  showEditDeviceModal: boolean;
  showDeleteDeviceModal: boolean;
}

const initialState: DeviceModalsState = {
  isFetchingDevice: false,
  isEditing: false,
  isDeleting: false,
  device: null,
  error: null,
  showEditDeviceModal: false,
  showDeleteDeviceModal: false
};

interface IEditDeviceParams {
  id: string;
  device: IDeviceForm;
}

export const editDevice = createAsyncThunk<void, IEditDeviceParams, { rejectValue: string }>(
  "device/editDevice",
  async ({ id, device }, { dispatch, signal }) => {
    await putDevices(id, device, {
      signal
    });

    await dispatch(fetchDevices({ signal }));
  }
);

export const deleteDevice = createAsyncThunk<void, string, { rejectValue: string }>(
  "device/deleteDevice",
  async (id, { dispatch, signal }) => {
    await deleteDevices(id, {
      signal
    });

    await dispatch(fetchDevices({ signal }));
  }
);

export const fetchDevice = createAsyncThunk<IDevice, string, { rejectValue: string }>(
  "device/fetchDevice",
  async (id, { rejectWithValue, signal }) => {
    try {
      const data = await getDeviceById(id, {
        signal
      });

      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message || "Failed to fetch devices" : "An unknown error occurred."
      );
    }
  }
);

const deviceModalsSlice = createSlice({
  name: "deviceModals",
  initialState,
  reducers: {
    setShowEditDeviceModal: (state, action: PayloadAction<boolean>) => {
      state.showEditDeviceModal = action.payload;

      if (!action.payload) {
        state.device = null;
      }
    },
    setShowDeleteDeviceModal: (state, action: PayloadAction<boolean>) => {
      state.showDeleteDeviceModal = action.payload;

      if (!action.payload) {
        state.device = null;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // edit device
      .addCase(editDevice.pending, (state) => {
        state.isEditing = true;
        state.error = null;
      })
      .addCase(editDevice.fulfilled, (state) => {
        state.isEditing = false;
        state.device = null;
      })
      .addCase(editDevice.rejected, (state, action) => {
        state.isEditing = false;
        state.error = action.payload || "Error editing device";
      })

      // delete device
      .addCase(deleteDevice.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteDevice.fulfilled, (state) => {
        state.isDeleting = false;
        state.device = null;
      })
      .addCase(deleteDevice.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload || "Error deleting device";
      })

      // fetch device
      .addCase(fetchDevice.pending, (state) => {
        state.isFetchingDevice = true;
        state.error = null;
      })
      .addCase(fetchDevice.fulfilled, (state, action) => {
        state.isFetchingDevice = false;
        state.device = action.payload;
      })
      .addCase(fetchDevice.rejected, (state, action) => {
        state.isFetchingDevice = false;
        state.error = action.payload || "Error fetching device";
      });
  }
});

export const { setShowEditDeviceModal, setShowDeleteDeviceModal } = deviceModalsSlice.actions;

export default deviceModalsSlice.reducer;
