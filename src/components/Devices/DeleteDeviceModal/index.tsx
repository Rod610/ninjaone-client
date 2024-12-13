import { FC } from "react";

import { useDeleteDevice } from "../../../api/services/DeviceService/mutation";
import {
  CANCEL_LABEL,
  DELETE_DEVICE_LABEL,
  DELETE_LABEL,
  DELETE_LEGEND_LABEL_FIRST,
  DELETE_LEGEND_LABEL_SECOND
} from "../../../constants/labels";
import { IDevice } from "../../../types/devices.types";
import Button from "../../common/Button";
import LoadingRing from "../../common/LoadingRing";
import Modal from "../../common/Modal";

type DeleteDeviceModalViewProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  device: IDevice;
};

const DeleteDeviceModal: FC<DeleteDeviceModalViewProps> = ({ show, setShow, device }) => {
  const { mutate, isPending: isPending } = useDeleteDevice();

  const onSubmitDelete = () => {
    if (device) {
      mutate(device.id, {
        onSuccess: () => {
          setShow(false);
        }
      });
    }
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
          disabled={isPending}
          className="text-white active:bg-red-800"
          onClick={onSubmitDelete}
        >
          {isPending ? (
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
