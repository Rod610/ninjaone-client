import { FC, useRef } from "react";

import { useDeviceModals } from "../../../hooks/useDeviceModals";
import { DeviceForm,DeviceModalProps, IDevice } from "../../../types/devices.types";
import { resetAbortController } from "../../../utils/abortController";

import EditDeviceModalView from "./View";

const EditDeviceModal: FC<DeviceModalProps> = ({ show, setShow, device }) => {
  const { editDevice, isEditing } = useDeviceModals();

  const editControllerRef = useRef<AbortController | null>(null);

  const onSubmit = async (id: string, values: DeviceForm) => {
    const controller = resetAbortController(editControllerRef);
    try {
      await editDevice(id, values, { signal: controller.signal }).unwrap();
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      console.error("Failed to edit device:", error);
    } finally {
      setShow(false);
    }
  };

  const handleOnChangeField = (
    e: { name: string; value: string },
    setFieldValue: (arg0: string, arg1: string) => void
  ) => {
    setFieldValue(e.name, e.value);
  };

  return (
    <>
      <EditDeviceModalView
        show={show}
        setShow={setShow}
        isPending={isEditing}
        onSubmit={onSubmit}
        handleOnChangeField={handleOnChangeField}
        device={device as IDevice}
      />
    </>
  );
};

export default EditDeviceModal;
