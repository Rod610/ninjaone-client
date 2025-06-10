import { ListboxOption } from "@headlessui/react";

import { useDevices } from "../../../../../hooks/useDevices";
import { generateSortOptions } from "../../../../../utils/generateSortOptions";
import SelectField from "../../../../shared/SelectField";

const sortOptions = generateSortOptions();

const SortBy = () => {
  const { sortOption, setSortOption } = useDevices();

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
          className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 text-start select-none hover:bg-[#337AB7] hover:text-white data-focus:bg-[#337AB7] data-focus:text-white data-focus:outline-hidden"
        >
          <span className="block truncate font-normal group-data-selected:font-semibold">
            {option.propertyLabel} ({option.orderLabel})
          </span>
        </ListboxOption>
      ))}
    </SelectField>
  );
};

export default SortBy;
