import { useCallback } from "react";
import { useShallow } from "zustand/shallow";

import { useDeviceModalsStore } from "../state/deviceModalsStore";
import { DeviceForm } from "../types/devices.types";

export const useDeviceModals = () => {

  const {
    isFetchingDevice,
    isEditing,
    isDeleting,
    device,
    showDeleteDeviceModal,
    showEditDeviceModal,
    editDevice,
    deleteDevice,
    setShowEditDeviceModal,
    setShowDeleteDeviceModal
  } = useDeviceModalsStore(
    useShallow((state) => ({
      isFetchingDevice: state.isFetchingDevice,
      isEditing: state.isEditing,
      isDeleting: state.isDeleting,
      device: state.device,
      showDeleteDeviceModal: state.showDeleteDeviceModal,
      showEditDeviceModal: state.showEditDeviceModal,
      editDevice: state.editDevice,
      deleteDevice: state.deleteDevice,
      setShowEditDeviceModal: state.setShowEditDeviceModal,
      setShowDeleteDeviceModal: state.setShowDeleteDeviceModal
    }))
  );

  const edit = useCallback(
    (id: string, device: DeviceForm, { signal }: { signal?: AbortSignal }) => {
      editDevice({ id, device }, signal);
    },
    [editDevice]
  );

  const deleteFn = useCallback(
    (id: string, { signal }: { signal?: AbortSignal }) => deleteDevice(id, signal),
    [deleteDevice]
  );

  return {
    isFetchingDevice,
    device,
    fetchDevice: fetch,
    editDevice: edit,
    deleteDevice: deleteFn,
    isEditing,
    isDeleting,
    showDeleteDeviceModal,
    showEditDeviceModal,
    setShowEditDeviceModal: (value: boolean) => setShowEditDeviceModal(value),
    setShowDeleteDeviceModal: (value: boolean) => setShowDeleteDeviceModal(value)
  };
};
