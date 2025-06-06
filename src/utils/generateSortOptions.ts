import { v4 as uuidv4 } from "uuid";

import { DeviceProperty, ISortOption } from "../types/devices.types";

const properties: DeviceProperty[] = [
  { propertyLabel: "HDD Capacity", propertyName: "hdd_capacity" },
  { propertyLabel: "Type", propertyName: "type" },
  { propertyLabel: "Name", propertyName: "system_name" }
];

export const generateSortOptions = (): ISortOption[] => {
  const options: ISortOption[] = properties.flatMap((property) => {
    return [
      {
        id: uuidv4(),
        ...property,
        orderLabel: "Descending",
        orderValue: "desc"
      },
      {
        id: uuidv4(),
        ...property,
        orderLabel: "Ascending",
        orderValue: "asc"
      }
    ];
  });

  return options;
};
