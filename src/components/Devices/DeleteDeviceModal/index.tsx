import { FC, useRef } from "react";

import {
  CANCEL_LABEL,
  DELETE_DEVICE_LABEL,
  DELETE_LABEL,
  DELETE_LEGEND_LABEL_FIRST,
  DELETE_LEGEND_LABEL_SECOND
} from "../../../constants/labels";
import { useDeviceModals } from "../../../hooks/useDeviceModals";
import { DeviceModalProps } from "../../../types/devices.types";
import { resetAbortController } from "../../../utils/abortController";
import Button from "../../shared/Button";
import LoadingRing from "../../shared/LoadingRing";
import Modal from "../../shared/Modal";

const DeleteDeviceModal: FC<DeviceModalProps> = ({ show, setShow, device }) => {
  const { deleteDevice, isDeleting } = useDeviceModals();

  const deleteControllerRef = useRef<AbortController | null>(null);

  const onSubmitDelete = async () => {
    const controller = resetAbortController(deleteControllerRef);

    try {
      if (device) {
        await deleteDevice(device.id, { signal: controller.signal });
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      console.error("Failed to delete device:", error);
    } finally {
      setShow(false);
    }
  };

  return (
    <Modal show={show} setShow={setShow} title={DELETE_DEVICE_LABEL}>
      <p className="text-sm">
        {DELETE_LEGEND_LABEL_FIRST} <span className="font-medium">{device?.system_name}</span>
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
