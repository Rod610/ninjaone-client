import { FC } from "react";

import { useAddDevice } from "../../../api/services/DeviceService/mutation";
import { IDeviceForm } from "../../../types/devices.types";

import AddDeviceModalLogic from "./AddDeviceModalLogic";
import { DeviceModalProps } from "./types";

const AddDeviceModal: FC<DeviceModalProps> = ({ show, setShow }) => {
  const { mutate, isPending } = useAddDevice();

  const onSubmit = async (values: IDeviceForm) => {
    mutate(values, {
      onSuccess: () => {
        setShow(false);
      },
    });
  };

  return <AddDeviceModalLogic show={show} setShow={setShow} isPending={isPending} onSubmit={onSubmit} />;
};

export default AddDeviceModal;
