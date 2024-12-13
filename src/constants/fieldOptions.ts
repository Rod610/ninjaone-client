export const deviceFields = [
  {
    type: "text",
    name: "system_name",
    id: "system_name",
    testId: "system_name",
    errorTestId: "system_name_error",
    placeholder: "",
    label: "System name *",
  },
  {
    type: "select",
    name: "type",
    id: "type",
    testId: "type",
    errorTestId: "type_error",
    placeholder: "Select type",
    label: "Device type *",
  },
  {
    type: "text",
    name: "hdd_capacity",
    id: "hdd_capacity",
    testId: "hdd_capacity",
    errorTestId: "hdd_capacity_error",
    placeholder: "",
    label: "HDD capacity (GB) *",
  }
];
