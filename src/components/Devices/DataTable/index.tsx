import { DeviceModalProvider } from "../../../context/DeviceModalContext";
import { useDevices } from "../../../hooks/useDevices";

import Table from "./Table";
import TableActions from "./TableActions";

const DataTable = () => {
  const { isFetching, data, refetch } = useDevices();

  return (
    <div>
      <TableActions refetch={refetch} />
      <DeviceModalProvider>
        <Table devices={data} isPending={isFetching} />
      </DeviceModalProvider>
    </div>
  );
};

export default DataTable;
