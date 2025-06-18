import { DeviceForm,DeviceModalProps } from "../../../types/devices.types";

export interface EditDeviceModalViewProps extends DeviceModalProps {
  isPending: boolean;
  handleOnChangeField: (
    e: { name: string; value: string },
    setFieldValue: (arg0: string, arg1: string) => void
  ) => void;
  onSubmit: (id: string, values: DeviceForm) => void;
}
