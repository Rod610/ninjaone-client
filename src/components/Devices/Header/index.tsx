import { FC } from "react";

import PlusIcon from "../../../assets/ActionIcons/PlusIcon.svg?react";
import { ADD_DEVICE_LABEL } from "../../../constants/labels";
import Button from "../../common/Button";

type HeaderProps = {
  setAddDeviceModal: (show: boolean) => void;
};

const Header: FC<HeaderProps> = ({ setAddDeviceModal }) => {
  return (
    <div className="flex flex-row justify-between items-center py-7">
      <h2 className="text-xl leading-5 font-medium">Devices</h2>
      <Button variant="primary" className="text-white" onClick={() => setAddDeviceModal(true)}>
        <PlusIcon className="fill-white" />
        {ADD_DEVICE_LABEL}
      </Button>
    </div>
  );
};

export default Header;
