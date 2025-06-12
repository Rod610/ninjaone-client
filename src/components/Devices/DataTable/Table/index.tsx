import { FC, useRef } from "react";

import { useDeviceModals } from "../../../../hooks/useDeviceModals";
import { IDevice } from "../../../../types/devices.types";
import { resetAbortController } from "../../../../utils/abortController";
import DeleteDeviceModal from "../../DeleteDeviceModal";
import EditDeviceModal from "../../EditDeviceModal";

import TableBody from "./TableBody";
import TableBodySkeleton from "./TableBodySkeleton";

const Table: FC<{ devices: IDevice[] | undefined; isPending: boolean }> = ({ devices = [], isPending }) => {
  const {
    device,
    fetchDevice,
    showEditDeviceModal,
    showDeleteDeviceModal,
    setShowEditDeviceModal,
    setShowDeleteDeviceModal
  } = useDeviceModals();

  const fetchControllerRef = useRef<AbortController | null>(null);

  const fetch = (id: string) => {
    const controller = resetAbortController(fetchControllerRef);

    fetchDevice(id, controller.signal);
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
              fetchDevice={fetch}
              setShowDeleteDeviceModal={setShowDeleteDeviceModal}
              setShowEditDeviceModal={setShowEditDeviceModal}
            />
          )}
        </tbody>
      </table>

      {device ? (
        <DeleteDeviceModal show={showDeleteDeviceModal} setShow={setShowDeleteDeviceModal} device={device as IDevice} />
      ) : null}

      {device ? (
        <EditDeviceModal show={showEditDeviceModal} setShow={setShowEditDeviceModal} device={device as IDevice} />
      ) : null}
    </div>
  );
};

export default Table;
