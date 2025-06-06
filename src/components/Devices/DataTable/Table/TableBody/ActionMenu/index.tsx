import { FC } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import OptionsIcon from "../../../../../../assets/ActionIcons/OptionsIcon.svg?react";

interface ActionMenuProps {
  setDeviceId: () => void;
  setDeleteDeviceModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEditDeviceModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActionMenu: FC<ActionMenuProps> = ({ setDeviceId, setDeleteDeviceModal, setEditDeviceModal }) => {
  const openModal = (modalType: "edit" | "delete") => {
    setDeviceId();
    if (modalType === "edit") {
      setEditDeviceModal(true);
    } else if (modalType === "delete") {
      setDeleteDeviceModal(true);
    }
  };

  return (
    <Menu as="div" className="relative flex-none">
      <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
        <span className="sr-only">Open options</span>
        <OptionsIcon aria-hidden="true" className="size-5" />
      </MenuButton>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-32 origin-top-right bg-white py-2 ring-1 shadow-lg ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <MenuItem>
          <a
            href="#"
            className="block px-3 py-1 text-sm/5 font-normal text-black font data-focus:bg-gray-50 data-focus:outline-hidden"
            onClick={() => openModal("edit")}
          >
            Edit
          </a>
        </MenuItem>
        <MenuItem>
          <a
            href="#"
            className="block px-3 py-1 text-sm/5 font-normal text-red-600 data-focus:bg-gray-50 data-focus:outline-hidden"
            onClick={() => openModal("delete")}
          >
            Delete
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default ActionMenu;
