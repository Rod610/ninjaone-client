import { FC } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, ListboxOption } from "@headlessui/react";
import { Field, Form, Formik } from "formik";

import CloseIcon from "../../../assets/ActionIcons/CloseIcon.svg?react";
import { devicesTypesSelect } from "../../../constants/devicesTypes";
import { deviceFields } from "../../../constants/fieldOptions";
import { ADD_DEVICE_LABEL, CANCEL_LABEL, CLOSE_LABEL, SUBMIT_LABEL } from "../../../constants/labels";
import { deviceType, IDeviceForm } from "../../../types/devices.types";
import { capitalize } from "../../../utils/capitalize";
import { addDeviceValidationSchema as validationSchema } from "../../../utils/schemas/devices.schema";
import Button from "../../common/Button";
import LoadingRing from "../../common/LoadingRing";
import SelectField from "../../common/SelectField";

import { DeviceModalViewProps } from "./types";

const AddDeviceModalView: FC<DeviceModalViewProps> = ({ show, handleOnChangeField, onSubmit, setShow, isPending }) => {
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
                  {ADD_DEVICE_LABEL}
                </DialogTitle>
                <div className="mt-8">
                  <Formik
                    validationSchema={validationSchema}
                    initialValues={{
                      system_name: "",
                      type: deviceType.None,
                      hdd_capacity: "",
                    }}
                    onSubmit={onSubmit}
                    enableReinitialize
                  >
                    {(formik) => {
                      const { values, errors, touched, handleBlur, setFieldValue } = formik;

                      return (
                        <Form data-testid="add-device-form">
                          <div className="flex flex-col space-y-3">
                            {deviceFields.map((deviceField) => {
                              return (
                                <div key={deviceField.id}>
                                  <label
                                    htmlFor={deviceField.name}
                                    className="block text-sm font-normal leading-6 text-gray-900"
                                  >
                                    {deviceField.label}
                                  </label>
                                  {deviceField.type === "text" ? (
                                    <Field
                                      type={deviceField.type}
                                      name={deviceField.name}
                                      data-testid={deviceField.testId}
                                      className={`bg-white border-solid outline outline-1 -outline-offset-1 outline-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5  ${
                                        errors &&
                                        errors[deviceField.name as keyof IDeviceForm] &&
                                        touched[deviceField.name as keyof IDeviceForm]
                                          ? "border-rose-500 dark:placeholder-rose-500"
                                          : " border-gray-300 dark:placeholder-gray"
                                      }`}
                                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const { name, value } = e.target;
                                        handleOnChangeField({ name, value }, setFieldValue);
                                      }}
                                      value={values[deviceField.name as keyof IDeviceForm] || ""}
                                      onBlur={handleBlur}
                                    />
                                  ) : (
                                    <SelectField
                                      value={values[deviceField.name as keyof IDeviceForm] || ""}
                                      onChange={(e: { value: string }) => {
                                        handleOnChangeField({ name: deviceField.name, value: e.value }, setFieldValue);
                                      }}
                                      label={
                                        capitalize(values[deviceField.name as keyof IDeviceForm]) || "Select a type"
                                      }
                                    >
                                      {devicesTypesSelect.map((type) => (
                                        <ListboxOption
                                          key={type.name}
                                          value={type}
                                          className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 text-start select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                                        >
                                          <span className="block truncate font-normal group-data-selected:font-semibold">
                                            {type.name}
                                          </span>

                                          {values[deviceField.name as keyof IDeviceForm] === type.value ? (
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                                              X
                                            </span>
                                          ) : null}
                                        </ListboxOption>
                                      ))}
                                    </SelectField>
                                  )}
                                  {errors &&
                                    errors[deviceField.name as keyof IDeviceForm] &&
                                    touched[deviceField.name as keyof IDeviceForm] && (
                                      <span
                                        className="text-xs text-red-500 font-bold"
                                        data-testid={deviceField.errorTestId}
                                      >
                                        {errors[deviceField.name as keyof IDeviceForm]}
                                      </span>
                                    )}
                                </div>
                              );
                            })}

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
                                variant="primary"
                                role="button"
                                name="Submit"
                                type="submit"
                                disabled={isPending}
                                className="text-white"
                              >
                                {isPending ? (
                                  <>
                                    <LoadingRing />
                                    {SUBMIT_LABEL}
                                  </>
                                ) : (
                                  SUBMIT_LABEL
                                )}
                              </Button>
                            </div>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddDeviceModalView;
