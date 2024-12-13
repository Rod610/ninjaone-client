import { FC, useState } from "react";

import { useDeleteDevice } from "../../../../api/services/DeviceService/mutation";
import { IDevice } from "../../../../types/devices.types";
import DeleteDeviceModal from "../../DeleteDeviceModal";

import TableBody from "./TableBody";
import TableBodySkeleton from "./TableBodySkeleton";

const Table: FC<{ devices: IDevice[] | undefined; isPending: boolean }> = ({ devices = [], isPending }) => {
  const { mutate, isPending: isDeletePending } = useDeleteDevice();

  const [showDeleteDeviceModal, setDeleteDeviceModal] = useState(false);
  const [showEditDeviceModal, setEditDeviceModal] = useState(false);
  const [device, setDevice] = useState<IDevice | undefined>(undefined);

  const onSubmitDelete = () => {
    if (device) {
      mutate(device.id, {
        onSuccess: () => {
          setDeleteDeviceModal(false);
        },
      });
    }
  };

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
        <DeleteDeviceModal
          show={showDeleteDeviceModal}
          setShow={setDeleteDeviceModal}
          onSubmit={onSubmitDelete}
          device={device as IDevice}
          isPending={isDeletePending}
        />
      ) : null}
    </div>
  );
};

export default Table;
