import { FC } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

import CloseIcon from "../../../assets/ActionIcons/CloseIcon.svg?react";
import { CANCEL_LABEL, CLOSE_LABEL, DELETE_DEVICE_LABEL, DELETE_LABEL, DELETE_LEGEND_LABEL_FIRST, DELETE_LEGEND_LABEL_SECOND } from "../../../constants/labels";
import { IDevice } from "../../../types/devices.types";
import Button from "../../common/Button";
import LoadingRing from "../../common/LoadingRing";

type DeleteDeviceModalViewProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  onSubmit: () => void;
  isPending: boolean;
  device: IDevice;
};

const DeleteDeviceModal: FC<DeleteDeviceModalViewProps> = ({ show, onSubmit, setShow, isPending, device }) => {
  return (
    <Dialog open={show} onClose={() => setShow(false)} className="relative z-10 max-w-2xl">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-[#211F33] opacity-50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-md bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-xl sm:py-7 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
              <button
                type="button"
                onClick={() => setShow(false)}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">{CLOSE_LABEL}</span>
                <CloseIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            <div className="sm:flex sm:items-start">
              <div className="mt-6 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <DialogTitle as="h3" className="text-2xl/7 font-medium text-gray-900">
                  {DELETE_DEVICE_LABEL}
                </DialogTitle>
                <div className="mt-8">
                  <p className="text-sm">{DELETE_LEGEND_LABEL_FIRST} <span className="font-medium">{device.system_name}</span>{DELETE_LEGEND_LABEL_SECOND}</p>

                  <div className="py-3 flex flex-row justify-end space-x-2">
                    <Button
                      className="text-black"
                      variant="secondary"
                      role="button"
                      name="Submit"
                      type="submit"
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
                      className="text-white"
                      onClick={onSubmit}
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
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteDeviceModal;
