import useDeviceModalContext from "./useDeviceModalContext";

export const useModalDevice = () => {
  const { isFetchingDevice, device, setDevice, getDevice, editDevice, deleteDevice, isEditing, isDeleting } =
    useDeviceModalContext();

  return {
    isFetchingDevice,
    device,
    setDevice,
    getDevice,
    editDevice,
    deleteDevice,
    isEditing,
    isDeleting
  };
};
