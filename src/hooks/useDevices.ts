import { useMemo } from "react";

import { filterByQuery } from "../utils/deviceFilters";

import { useDevice } from "./useDevice";
import { useDeviceDataTable } from "./useDeviceDataTable";

export const useDevices = () => {
  const { search, deviceType, sortOption, setSearch, setDeviceType, setSortOption } = useDeviceDataTable();
  const { isFetching, isAdding, data, refetch, addDevice } = useDevice();

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
    sortOption,
    deviceType,
    refetch,
    addDevice,
    setSearch,
    setDeviceType,
    setSortOption
  };
};
