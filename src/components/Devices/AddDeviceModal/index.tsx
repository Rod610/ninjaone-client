import { FC } from "react";

import { useAddDevice } from "../../../api/services/DeviceService/mutation";
import { IDeviceForm } from "../../../types/devices.types";

import { AddDeviceModalProps } from "./types";
import AddDeviceModalView from "./View";

const AddDeviceModal: FC<AddDeviceModalProps> = ({ show, setShow }) => {
  const { mutate, isPending } = useAddDevice();

  const onSubmit = async (values: IDeviceForm) => {
    mutate(values, {
      onSuccess: () => {
        setShow(false);
      }
    });
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
