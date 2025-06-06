import React, { FC } from "react";
import { ListboxOption } from "@headlessui/react";
import { Field, Form, Formik } from "formik";

import { devicesTypesSelect } from "../../../constants/devicesTypes";
import { deviceFields } from "../../../constants/fieldOptions";
import { CANCEL_LABEL, EDIT_DEVICE_LABEL, SUBMIT_LABEL } from "../../../constants/labels";
import { IDeviceForm } from "../../../types/devices.types";
import { capitalize } from "../../../utils/capitalize";
import { DeviceFormValidationSchema as validationSchema } from "../../../utils/schemas/devices.schema";
import Button from "../../common/Button";
import LoadingRing from "../../common/LoadingRing";
import Modal from "../../common/Modal";
import SelectField from "../../common/SelectField";

import { EditDeviceModalViewProps } from "./types";

const EditDeviceModalView: FC<EditDeviceModalViewProps> = ({
  show,
  handleOnChangeField,
  onSubmit,
  setShow,
  isPending,
  device
}) => {
  return (
    <Modal show={show} setShow={setShow} title={EDIT_DEVICE_LABEL}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          ...device,
          hdd_capacity: device.hdd_capacity as string
        }}
        onSubmit={(values) => onSubmit(device.id, values)}
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
                      <label htmlFor={deviceField.name} className="block text-sm font-normal leading-6 text-gray-900">
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
                          label={capitalize(values[deviceField.name as keyof IDeviceForm]) || "Select a type"}
                        >
                          {devicesTypesSelect.map((type) => (
                            <ListboxOption
                              key={type.name}
                              value={type}
                              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 text-start select-none hover:bg-[#337AB7] hover:text-white data-focus:bg-[#337AB7] data-focus:text-white data-focus:outline-hidden"
                            >
                              <span className="block truncate font-normal group-data-selected:font-semibold">
                                {type.name}
                              </span>
                            </ListboxOption>
                          ))}
                        </SelectField>
                      )}
                      {errors &&
                        errors[deviceField.name as keyof IDeviceForm] &&
                        touched[deviceField.name as keyof IDeviceForm] && (
                          <span className="text-xs text-red-500 font-bold" data-testid={deviceField.errorTestId}>
                            {errors[deviceField.name as keyof IDeviceForm]}
                          </span>
                        )}
                    </div>
                  );
                })}

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
                    variant="primary"
                    role="button"
                    name="Submit"
                    type="submit"
                    disabled={isPending}
                    className="text-white active:bg-cyan-800"
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
    </Modal>
  );
};

export default EditDeviceModalView;
