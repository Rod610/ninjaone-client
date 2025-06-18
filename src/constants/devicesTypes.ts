import { DeviceType } from "../types/devices.types";

export const devicesTypes = [
  { id: 0, name: "All", value: DeviceType.None },
  { id: 1, name: "Windows", value: DeviceType.Windows },
  { id: 2, name: "Linux", value: DeviceType.Linux },
  { id: 3, name: "Mac", value: DeviceType.Mac }
];

export const devicesTypesSelect = [
  { name: "Windows", value: DeviceType.Windows },
  { name: "Linux", value: DeviceType.Linux },
  { name: "Mac", value: DeviceType.Mac }
];
