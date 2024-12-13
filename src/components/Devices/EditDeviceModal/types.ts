import { IDevice, IDeviceForm } from "../../../types/devices.types";

export type EditDeviceModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  device: IDevice;
};

export type EditDeviceModalViewProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  isPending: boolean;
  handleOnChangeField: (
    e: { name: string; value: string },
    setFieldValue: (arg0: string, arg1: string) => void
  ) => void;
  onSubmit: (values: IDeviceForm) => void;
  device: IDevice;
};
