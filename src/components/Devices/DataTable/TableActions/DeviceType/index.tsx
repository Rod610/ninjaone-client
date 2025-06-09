import { ListboxOption } from "@headlessui/react";

import { devicesTypes } from "../../../../../constants/devicesTypes";
import useDeviceDataTableContext from "../../../../../hooks/useDeviceDataTableContext";
import SelectField from "../../../../shared/SelectField";

const DeviceType = () => {
  const { deviceType, setDeviceType } = useDeviceDataTableContext();

  return (
    <SelectField
      value={deviceType}
      onChange={setDeviceType}
      label={`Device Type: ${deviceType.name}`}
      className="min-w-[194px]"
    >
      {devicesTypes.map((type) => (
        <ListboxOption
          key={type.id}
          value={type}
          className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 text-start select-none hover:bg-[#337AB7] hover:text-white data-focus:bg-[#337AB7] data-focus:text-white data-focus:outline-hidden"
        >
          <span className="block truncate font-normal group-data-selected:font-semibold">{type.name}</span>
        </ListboxOption>
      ))}
    </SelectField>
  );
};

export default DeviceType;
