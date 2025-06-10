import { FC, useRef } from "react";

import { useDevices } from "../../../hooks/useDevices";
import { IDeviceForm } from "../../../types/devices.types";
import { resetAbortController } from "../../../utils/abortController";

import { AddDeviceModalProps } from "./types";
import AddDeviceModalView from "./View";

const AddDeviceModal: FC<AddDeviceModalProps> = ({ show, setShow }) => {
  const { isAdding: isPending, addDevice } = useDevices();

  const addControllerRef = useRef<AbortController | null>(null);

  const onSubmit = async (values: IDeviceForm) => {
    const controller = resetAbortController(addControllerRef);

    try {
      await addDevice(values, { signal: controller.signal }).unwrap();
      setShow(false);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      console.error("Failed to add device:", error);
    }
  };

  const handleOnChangeField = (
    e: { name: string; value: string },
    setFieldValue: (arg0: string, arg1: string) => void
  ) => {
    setFieldValue(e.name, e.value);
  };

  return (
    <AddDeviceModalView
      show={show}
      setShow={setShow}
      isPending={isPending}
      onSubmit={onSubmit}
      handleOnChangeField={handleOnChangeField}
    />
  );
};

export default AddDeviceModal;
