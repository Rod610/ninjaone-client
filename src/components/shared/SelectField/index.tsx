/* eslint-disable @typescript-eslint/no-explicit-any */
import { Listbox, ListboxButton, ListboxOptions } from "@headlessui/react";

import SelectIcon from "../../../assets/ActionIcons/SelectIcon.svg?react";
import { classNames } from "../../../utils/classNames";

type SelectProps<T> = {
  value: any;
  onChange: (value: T) => void;
  label: string;
  className?: string;
  placehoder?: string;
  children: React.ReactNode;
};

const SelectField = <T,>({ value, onChange, label, className, children }: SelectProps<T>) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className={classNames("relative", className)}>
        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6">
          <span className="col-start-1 row-start-1 truncate pr-6">{label}</span>
          <SelectIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {children}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export default SelectField;
