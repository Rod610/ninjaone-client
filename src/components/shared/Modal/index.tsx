import { FC } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

import CloseIcon from "../../../assets/ActionIcons/CloseIcon.svg?react";
import { CLOSE_LABEL } from "../../../constants/labels";
import { IModalsProps } from "../../../types/components.types";

const Modal: FC<IModalsProps> = ({ show, setShow, title, children }) => {
  return (
    <Dialog open={show} onClose={() => setShow(false)} className="relative z-10 max-w-2xl">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 opacity-60 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
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
                  {title}
                </DialogTitle>
                <div className="mt-8">{children}</div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
