import { create } from "zustand";

import { deleteDevices, getDeviceById, putDevices } from "../api/services/DeviceService/service";
import { DeviceForm, IDevice } from "../types/devices.types";

import { useDeviceStore } from "./DeviceStore";


interface DeviceModalsStore {
  isFetchingDevice: boolean;
  isEditing: boolean;
  isDeleting: boolean;
  device: IDevice | null;
  error: string | null;
  showEditDeviceModal: boolean;
  showDeleteDeviceModal: boolean;
  setShowEditDeviceModal: (show: boolean) => void;
  setShowDeleteDeviceModal: (show: boolean) => void;
  editDevice: (params: IEditDeviceParams, signal?: AbortSignal) => Promise<void>;
  deleteDevice: (id: string, signal?: AbortSignal) => Promise<void>;
  fetchDevice: (id: string, signal?: AbortSignal) => Promise<void>;
}

interface IEditDeviceParams {
  id: string;
  device: DeviceForm;
}

export const useDeviceModalsStore = create<DeviceModalsStore>((set, get) => ({
  isFetchingDevice: false,
  isEditing: false,
  isDeleting: false,
  device: null,
  error: null,
  showEditDeviceModal: false,
  showDeleteDeviceModal: false,
  setShowEditDeviceModal: (show: boolean) => {
    set({ showEditDeviceModal: show, device: show ? get().device : null });
  },
  setShowDeleteDeviceModal: (show: boolean) => {
    set({ showDeleteDeviceModal: show, device: show ? get().device : null });
  },
  editDevice: async ({ id, device }: IEditDeviceParams, signal?: AbortSignal) => {
    try {
      set({ isEditing: true, error: null });

      await putDevices(id, device, {
        signal
      });

      await useDeviceStore.getState().fetchDevices(signal);

      set({ showEditDeviceModal: false, device: null });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message || "Failed to edit a device" : "An unknown error occurred."
      });
    } finally {
      set({ isEditing: false });
    }
  },
  deleteDevice: async (id: string, signal?: AbortSignal) => {
    try {
      set({ isDeleting: true, error: null });

      await deleteDevices(id, {
        signal
      });

      await useDeviceStore.getState().fetchDevices(signal);

      set({ showDeleteDeviceModal: false, device: null });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message || "Failed to delete a device" : "An unknown error occurred."
      });
    } finally {
      set({ isDeleting: false });
    }
  },
  fetchDevice: async (id: string, signal?: AbortSignal) => {
    try {
      set({ isFetchingDevice: true, error: null });

      const device = await getDeviceById(id, { signal });
      set({ device });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message || "Failed to fetch device" : "An unknown error occurred."
      });
    } finally {
      set({ isFetchingDevice: false });
    }
  }
}));
