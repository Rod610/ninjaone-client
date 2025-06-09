import { createContext, FC, ReactNode, useCallback, useMemo, useReducer, useRef } from "react";

import { deleteDevices, getDeviceById, putDevices } from "../api/services/DeviceService/service";
import { IDevice, IDeviceForm } from "../types/devices.types";
import { resetAbortController } from "../utils/abortController";

import { Action, IDeviceModalContext, IDeviceModalInitialState } from "./types";

const DeviceModalContext = createContext<IDeviceModalContext | undefined>(undefined);

const initialState: IDeviceModalInitialState = {
  isFetchingDevice: false,
  isEditing: false,
  isDeleting: false,
  device: null
};

const reducer = (state: IDeviceModalInitialState, action: Action): IDeviceModalInitialState => {
  switch (action.type) {
    case "FETCHING_DEVICE":
      return { ...state, isFetchingDevice: action.payload };
    case "EDITING_DEVICE":
      return { ...state, isEditing: action.payload };
    case "DELETING_DEVICE":
      return { ...state, isDeleting: action.payload };
    case "SET_DEVICE":
      return { ...state, device: action.payload };
    default:
      return state;
  }
};

export const DeviceModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isFetchingDevice, isEditing, isDeleting, device } = state;

  const setDevice = useCallback((device: IDevice | null) => {
    dispatch({ type: "SET_DEVICE", payload: device });
  }, []);

  const fetchControllerRef = useRef<AbortController | null>(null);
  const editControllerRef = useRef<AbortController | null>(null);
  const deleteControllerRef = useRef<AbortController | null>(null);

  const editDevice = useCallback(async (id: string, device: IDeviceForm) => {
    const controller = resetAbortController(editControllerRef);

    try {
      dispatch({ type: "EDITING_DEVICE", payload: true });

      await putDevices(id, device, {
        signal: controller.signal
      });
    } finally {
      dispatch({ type: "EDITING_DEVICE", payload: false });
    }
  }, []);

  const deleteDevice = useCallback(async (id: string) => {
    const controller = resetAbortController(deleteControllerRef);

    try {
      dispatch({ type: "DELETING_DEVICE", payload: true });
      dispatch({ type: "SET_DEVICE", payload: null });

      await deleteDevices(id, {
        signal: controller.signal
      });
    } finally {
      dispatch({ type: "DELETING_DEVICE", payload: false });
    }
  }, []);

  const getDevice = useCallback(async (id: string) => {
    const controller = resetAbortController(fetchControllerRef);

    try {
      dispatch({ type: "FETCHING_DEVICE", payload: true });
      dispatch({ type: "SET_DEVICE", payload: null });

      const data = await getDeviceById(id, {
        signal: controller.signal
      });

      dispatch({ type: "SET_DEVICE", payload: data });
    } finally {
      dispatch({ type: "FETCHING_DEVICE", payload: false });
    }
  }, []);

  const value = useMemo(
    () => ({
      isFetchingDevice,
      isEditing,
      isDeleting,
      device,
      setDevice,
      getDevice,
      editDevice,
      deleteDevice
    }),
    [isFetchingDevice, isDeleting, isEditing, device, setDevice, getDevice, editDevice, deleteDevice]
  );

  return <DeviceModalContext.Provider value={value}>{children}</DeviceModalContext.Provider>;
};

export default DeviceModalContext;
