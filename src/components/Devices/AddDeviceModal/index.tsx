import { FC } from "react";

import { useDevices } from "../../../hooks/useDevices";
import { IDeviceForm } from "../../../types/devices.types";

import { AddDeviceModalProps } from "./types";
import AddDeviceModalView from "./View";

const AddDeviceModal: FC<AddDeviceModalProps> = ({ show, setShow }) => {
  const { isAdding: isPending, addDevice } = useDevices();

  const onSubmit = async (values: IDeviceForm) => {
    await addDevice(values);
    setShow(false);
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
