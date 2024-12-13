import { FC } from "react";

import AddDeviceModalView from "./AddDeviceModalView";
import { DeviceModalLogicProps } from "./types";

const AddDeviceModalLogic: FC<DeviceModalLogicProps> = ({ show, setShow, onSubmit, isPending }) => {
  const handleOnChangeField = (
    e: { name: string; value: string },
    setFieldValue: (arg0: string, arg1: string) => void
  ) => {
    setFieldValue(e.name, e.value);
  };

  return (
    <AddDeviceModalView show={show} setShow={setShow} isPending={isPending} onSubmit={onSubmit} handleOnChangeField={handleOnChangeField} />
  );
};

export default AddDeviceModalLogic;
