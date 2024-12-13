import { useQuery } from "@tanstack/react-query";

import DeviceQueryMethods from "../../../api/services/DeviceService/query";
import { GET_ALL_DEVICES } from "../../../constants/queryKeys";
import useDeviceDataTableContext from "../../../hooks/useDeviceDataTableContext";

import Table from "./Table";
import TableActions from "./TableActions";

const DataTable = () => {
  const { search, deviceType, sortOption } = useDeviceDataTableContext();

  const { data, refetch, isPending } = useQuery({
    queryKey: [GET_ALL_DEVICES, search, deviceType.value, sortOption.orderValue, sortOption.propertyName],
    queryFn: () =>
      DeviceQueryMethods.getAllDevices({
        search,
        deviceType: deviceType.value,
        sortOptionOrder: sortOption.orderValue,
        sortOptionProperty: sortOption.propertyName,
      }),
  });

  return (
    <div>
      <TableActions refetch={refetch}/>
      <Table devices={data} isPending={isPending} />
    </div>
  );
};

export default DataTable;
