import { create } from "zustand";

import { getDevices, postDevices } from "../api/services/DeviceService/service";
import { DeviceForm, IDevice } from "../types/devices.types";

interface DeviceStore {
  isFetching: boolean;
  isAdding: boolean;
  data: IDevice[];
  error: string | null;
  fetchDevices: (signal?: AbortSignal) => Promise<void>;
  addDevice: (device: DeviceForm, signal?: AbortSignal) => Promise<void>;
}

export const useDeviceStore = create<DeviceStore>((set, get) => ({
  isFetching: false,
  isAdding: false,
  data: [],
  error: null,
  fetchDevices: async (signal?: AbortSignal) => {
    try {
      set({ isFetching: true, error: null });

      const data = await getDevices({
        signal
      });

      set({ data });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message || "Failed to fetch devices" : "An unknown error occurred."
      });
    } finally {
      set({ isFetching: false });
    }
  },
  addDevice: async (device: DeviceForm, signal?: AbortSignal) => {
    try {
      set({ isAdding: true, error: null });

      await postDevices(device, {
        signal
      });

      await get().fetchDevices(signal);
    } catch (error) {
      set({
        error: error instanceof Error ? error.message || "Failed to add a device" : "An unknown error occurred."
      });
    } finally {
      set({ isAdding: false });
    }
  }
}));
