import { IDeviceForm } from "../../../types/devices.types";

export type DeviceModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
};

export type DeviceModalLogicProps = {
    show: boolean;
    setShow: (show: boolean) => void;
    onSubmit: (values: IDeviceForm) => void;
    isPending: boolean;
  };
  


export type DeviceModalViewProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  isPending: boolean;
  handleOnChangeField: (
    e: { name: string; value: string },
    setFieldValue: (arg0: string, arg1: string) => void
  ) => void;
  onSubmit: (values: IDeviceForm) => void;
};
