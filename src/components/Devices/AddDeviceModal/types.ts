import { IModalBase } from "../../../types/components.types";
import { DeviceForm } from "../../../types/devices.types";

export interface AddDeviceModalViewProps extends IModalBase {
  isPending?: boolean;
  handleOnChangeField: (
    e: { name: string; value: string },
    setFieldValue: (arg0: string, arg1: string) => void
  ) => void;
  onSubmit: (values: DeviceForm) => void;
}
