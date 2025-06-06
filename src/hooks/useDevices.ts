import { useMemo } from "react";

import { filterByQuery } from "../utils/deviceFilters";

import useDeviceDataTableContext from "./useDeviceDataTableContext";
import useDeviceContext from "./useDevicesContext";

export const useDevices = () => {
  const { search, deviceType, sortOption } = useDeviceDataTableContext();

  const { isFetching, isAdding, data, refetch, addDevice } = useDeviceContext();

  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const filteredDevices = filterByQuery(data, {
      search,
      deviceType: deviceType.value,
      sortOptionOrder: sortOption.orderValue,
      sortOptionProperty: sortOption.propertyName
    });

    return filteredDevices;
  }, [data, search, deviceType, sortOption]);

  return {
    isFetching,
    isAdding,
    data: filteredData,
    refetch,
    addDevice
  };
};
