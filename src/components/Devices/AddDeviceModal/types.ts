import { IDeviceForm } from "../../../types/devices.types";

export type AddDeviceModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
};

export type AddDeviceModalViewProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  isPending?: boolean;
  handleOnChangeField: (
    e: { name: string; value: string },
    setFieldValue: (arg0: string, arg1: string) => void
  ) => void;
  onSubmit: (values: IDeviceForm) => void;
};
