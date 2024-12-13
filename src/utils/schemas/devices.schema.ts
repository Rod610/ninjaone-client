import * as Yup from "yup";

import { DEVICES } from "../../constants/devicesTypes";
import {
  DEVICE_TYPE_REQUIRED,
  HDD_CAPACITY_MUST_BE_A_NUMBER,
  HDD_CAPACITY_MUST_BE_A_POSITIVE_NUMBER,
  HDD_CAPACITY_MUST_BE_AN_INTEGER,
  HDD_CAPACITY_REQUIRED,
  SYSTEM_NAME_REQUIRED,
} from "../../constants/labels";
import { capitalize } from "../capitalize";

export const addDeviceValidationSchema = Yup.object().shape({
  system_name: Yup.string().required(SYSTEM_NAME_REQUIRED),
  type: Yup.string()
    .oneOf(
      [DEVICES.WINDOWS, DEVICES.MAC, DEVICES.LINUX],
      `Allowed order status [${capitalize(DEVICES.WINDOWS)}, ${capitalize(DEVICES.MAC)}, ${capitalize(DEVICES.LINUX)}]`
    )
    .required(DEVICE_TYPE_REQUIRED),
  hdd_capacity: Yup.number()
    .typeError(HDD_CAPACITY_MUST_BE_A_NUMBER)
    .integer(HDD_CAPACITY_MUST_BE_AN_INTEGER)
    .positive(HDD_CAPACITY_MUST_BE_A_POSITIVE_NUMBER)
    .required(HDD_CAPACITY_REQUIRED),
});
