import { FC } from "react";
import { useQuery } from "@tanstack/react-query";

import { useEditDevice } from "../../../api/services/DeviceService/mutation";
import DeviceQueryMethods from "../../../api/services/DeviceService/query";
import { GET_DEVICE } from "../../../constants/queryKeys";
import { IDevice, IDeviceForm } from "../../../types/devices.types";

import { EditDeviceModalProps } from "./types";
import EditDeviceModalView from "./View";

const EditDeviceModal: FC<EditDeviceModalProps> = ({ show, setShow, device }) => {
  const { data } = useQuery({
    queryKey: [GET_DEVICE, device.id],
    queryFn: () => DeviceQueryMethods.getDeviceById(device.id)
  });

  const { mutate, isPending } = useEditDevice();

  const onSubmit = async (values: IDeviceForm) => {
    mutate(
      { id: device.id, data: values },
      {
        onSuccess: () => {
          setShow(false);
        }
      }
    );
  };

  const handleOnChangeField = (
    e: { name: string; value: string },
    setFieldValue: (arg0: string, arg1: string) => void
  ) => {
    setFieldValue(e.name, e.value);
  };

  return (
    <>
      {data ? (
        <EditDeviceModalView
          show={show}
          setShow={setShow}
          isPending={isPending}
          onSubmit={onSubmit}
          handleOnChangeField={handleOnChangeField}
          device={data as IDevice}
        />
      ) : null}
    </>
  );
};

export default EditDeviceModal;
