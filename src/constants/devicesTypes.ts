export const DEVICES = {
  WINDOWS: "WINDOWS",
  MAC: "MAC",
  LINUX: "LINUX",
};

export const devicesTypes = [
  { id: 0, name: "All", value: "" },
  { id: 1, name: "Windows", value: DEVICES.WINDOWS },
  { id: 2, name: "Linux", value: DEVICES.LINUX },
  { id: 3, name: "Mac", value: DEVICES.MAC },
];

export const devicesTypesSelect = [
  { name: "Windows", value: DEVICES.WINDOWS },
  { name: "Linux", value: DEVICES.LINUX },
  { name: "Mac", value: DEVICES.MAC },
];
