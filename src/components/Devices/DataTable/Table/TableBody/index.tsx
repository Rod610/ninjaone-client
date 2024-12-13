import { FC } from "react";

import LinuxIcon from "../../../../../assets/OSIcons/LinuxIcon.svg?react";
import MacIcon from "../../../../../assets/OSIcons/MacIcon.svg?react";
import WindowsIcon from "../../../../../assets/OSIcons/WinIcon.svg?react";
import { DEVICES } from "../../../../../constants/devicesTypes";
import { deviceType, IDevice } from "../../../../../types/devices.types";
import { capitalize } from "../../../../../utils/capitalize";

import ActionMenu from "./ActionMenu";

const DeviceIcon: FC<{ deviceType: deviceType }> = ({ deviceType }) => {
  switch (deviceType) {
    case DEVICES.WINDOWS:
      return <WindowsIcon />;
    case DEVICES.LINUX:
      return <LinuxIcon />;
    case DEVICES.MAC:
      return <MacIcon />;
    default:
      return null;
  }
};

type TableBodyProps = {
  devices: IDevice[];
  setDevice: (device: IDevice) => void;
  setDeleteDeviceModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEditDeviceModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const TableBody: FC<TableBodyProps> = ({ devices, setDevice, setDeleteDeviceModal, setEditDeviceModal }) => {
  return (
    <>
      {devices.map((device) => (
        <tr key={device.id} className="hover:bg-gray-50">
          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0 text-justify">
            <div className="flex flex-row justify-between">
              <div>
                <div className="flex flex-row space-x-1">
                  <DeviceIcon deviceType={device.type} />
                  <p>{device.system_name}</p>
                </div>
                <p className="text-gray-500 text-xs/4 font-normal leading-4">
                  {capitalize(device.type)} workstation - {device.hdd_capacity} GB
                </p>
              </div>

              <div className="flex items-center">
                <ActionMenu
                  setDevice={() => setDevice(device)}
                  setDeleteDeviceModal={setDeleteDeviceModal}
                  setEditDeviceModal={setEditDeviceModal}
                />
              </div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TableBody;
