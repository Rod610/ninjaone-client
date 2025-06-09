import { FC } from "react";

import { useDevices } from "../../../hooks/useDevices";
import { useModalDevice } from "../../../hooks/useModalDevice";
import { DeviceModalProps, IDevice, IDeviceForm } from "../../../types/devices.types";

import EditDeviceModalView from "./View";

const EditDeviceModal: FC<DeviceModalProps> = ({ show, setShow, device }) => {
  const { editDevice, isEditing } = useModalDevice();
  const { refetch } = useDevices();

  const onSubmit = async (id: string, values: IDeviceForm) => {
    await editDevice(id, values);
    setShow(false);

    await refetch();
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
