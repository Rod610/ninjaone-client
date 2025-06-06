import { createContext, FC, ReactNode, useState } from "react";

import { devicesTypes } from "../constants/devicesTypes";
import { IDevicesType, ISortOption } from "../types/devices.types";
import { generateSortOptions } from "../utils/generateSortOptions";

import { IDeviceDataTableContext } from "./types";


const DeviceDataTableContext = createContext<IDeviceDataTableContext | undefined>(undefined);

const sortOptions = generateSortOptions();

export const DeviceDataTableProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [search, setSearch] = useState<string>("");
  const [deviceType, setDeviceType] = useState<IDevicesType>(devicesTypes[0]);
  const [sortOption, setSortOption] = useState<ISortOption>(sortOptions[0]);

  return (
    <DeviceDataTableContext.Provider
      value={{ search, setSearch, deviceType, setDeviceType, sortOption, setSortOption }}
    >
      {children}
    </DeviceDataTableContext.Provider>
  );
};

export default DeviceDataTableContext;
