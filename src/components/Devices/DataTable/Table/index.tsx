import { FC, useState } from "react";

import { IDevice } from "../../../../types/devices.types";
import DeleteDeviceModal from "../../DeleteDeviceModal";
import EditDeviceModal from "../../EditDeviceModal";

import TableBody from "./TableBody";
import TableBodySkeleton from "./TableBodySkeleton";

const Table: FC<{ devices: IDevice[] | undefined; isPending: boolean }> = ({ devices = [], isPending }) => {
  const [showDeleteDeviceModal, setDeleteDeviceModal] = useState(false);
  const [showEditDeviceModal, setEditDeviceModal] = useState(false);
  const [device, setDevice] = useState<IDevice | undefined>(undefined);

  return (
    <div className="py-3">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
              Device
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {isPending ? (
            <TableBodySkeleton />
          ) : (
            <TableBody
              devices={devices}
              setDevice={setDevice}
              setDeleteDeviceModal={setDeleteDeviceModal}
              setEditDeviceModal={setEditDeviceModal}
            />
          )}
        </tbody>
      </table>

      {device ? (
        <DeleteDeviceModal show={showDeleteDeviceModal} setShow={setDeleteDeviceModal} device={device as IDevice} />
      ) : null}

      {device ? (
        <EditDeviceModal show={showEditDeviceModal} setShow={setEditDeviceModal} device={device as IDevice} />
      ) : null}
    </div>
  );
};

export default Table;
