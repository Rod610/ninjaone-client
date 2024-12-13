import { ListboxOption } from "@headlessui/react";

import useDeviceDataTableContext from "../../../../../hooks/useDeviceDataTableContext";
import { generateSortOptions } from "../../../../../utils/generateSortOptions";
import SelectField from "../../../../common/SelectField";

const sortOptions = generateSortOptions();

const SortBy = () => {
  const { sortOption, setSortOption } = useDeviceDataTableContext();

  return (
    <SelectField
      value={sortOption}
      onChange={setSortOption}
      label={`Sort by: ${sortOption.propertyLabel} (${sortOption.orderLabel})`}
      className="min-w-[320px]"
    >
      {sortOptions.map((option) => (
        <ListboxOption
          key={option.id}
          value={option}
          className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 text-start select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
        >
          <span className="block truncate font-normal group-data-selected:font-semibold">
            {option.propertyLabel} ({option.orderLabel})
          </span>

          {sortOption.id === option.id ? (
            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
              X
            </span>
          ) : null}
        </ListboxOption>
      ))}
    </SelectField>
  );
};

export default SortBy;
