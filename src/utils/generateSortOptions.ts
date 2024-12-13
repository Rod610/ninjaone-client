import { sortOption } from "../types/devices.types";

interface Property {
  label: string;
  name: string;
}

const properties: Property[] = [
  { label: "HDD Capacity", name: "hdd_capacity" },
  { label: "Type", name: "type" },
  { label: "Name", name: "system_name" },
];

export const generateSortOptions = (): sortOption[] => {
  let id = 0;
  const options: sortOption[] = [];

  properties.forEach((property) => {
    options.push(
      {
        id: id++,
        propertyLabel: property.label,
        propertyName: property.name,
        orderLabel: "Descending",
        orderValue: "desc",
      },
      {
        id: id++,
        propertyLabel: property.label,
        propertyName: property.name,
        orderLabel: "Ascending",
        orderValue: "asc",
      }
    );
  });

  return options;
};
