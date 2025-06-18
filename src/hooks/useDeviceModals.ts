import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteDevice,
  editDevice,
  fetchDevice,
  setShowDeleteDeviceModal,
  setShowEditDeviceModal
} from "../state/deviceModals/deviceModalsSlice";
import { AppDispatch, RootState } from "../state/store";
import { DeviceForm } from "../types/devices.types";

export const useDeviceModals = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isFetchingDevice, isEditing, isDeleting, device, showDeleteDeviceModal, showEditDeviceModal } = useSelector(
    (state: RootState) => state.deviceModals
  );

  const fetch = useCallback(
    (id: string, signal?: AbortSignal) => {
      void dispatch(fetchDevice(id, { signal }));
    },
    [dispatch]
  );

  const edit = useCallback(
    (id: string, device: DeviceForm, { signal }: { signal?: AbortSignal }) =>
      dispatch(editDevice({ id, device }, { signal })),
    [dispatch]
  );

  const deleteFn = useCallback(
    (id: string, { signal }: { signal?: AbortSignal }) => void dispatch(deleteDevice(id, { signal })),
    [dispatch]
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
    setShowEditDeviceModal: (value: boolean) => dispatch(setShowEditDeviceModal(value)),
    setShowDeleteDeviceModal: (value: boolean) => dispatch(setShowDeleteDeviceModal(value))
  };
};
