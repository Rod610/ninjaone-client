import { FC } from "react";

import {
  CANCEL_LABEL,
  DELETE_DEVICE_LABEL,
  DELETE_LABEL,
  DELETE_LEGEND_LABEL_FIRST,
  DELETE_LEGEND_LABEL_SECOND
} from "../../../constants/labels";
import { useDevices } from "../../../hooks/useDevices";
import { useModalDevice } from "../../../hooks/useModalDevice";
import { DeviceModalProps } from "../../../types/devices.types";
import Button from "../../shared/Button";
import LoadingRing from "../../shared/LoadingRing";
import Modal from "../../shared/Modal";

const DeleteDeviceModal: FC<DeviceModalProps> = ({ show, setShow, device }) => {
  const { deleteDevice, isDeleting } = useModalDevice();
  const { refetch } = useDevices();

  const onSubmitDelete = async () => {
    await deleteDevice(device.id);
    setShow(false);

    await refetch();
  };

  return (
    <Modal show={show} setShow={setShow} title={DELETE_DEVICE_LABEL}>
      <p className="text-sm">
        {DELETE_LEGEND_LABEL_FIRST} <span className="font-medium">{device.system_name}</span>
        {DELETE_LEGEND_LABEL_SECOND}
      </p>

      <div className="py-3 flex flex-row justify-end space-x-2">
        <Button
          className="text-black active:bg-slate-100"
          variant="secondary"
          role="button"
          name="Submit"
          type="button"
          onClick={() => setShow(false)}
        >
          {CANCEL_LABEL}
        </Button>
        <Button
          variant="danger"
          role="button"
          name="Submit"
          type="submit"
          disabled={isDeleting}
          className="text-white active:bg-red-800"
          onClick={onSubmitDelete}
        >
          {isDeleting ? (
            <>
              <LoadingRing />
              {DELETE_LABEL}
            </>
          ) : (
            DELETE_LABEL
          )}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteDeviceModal;
