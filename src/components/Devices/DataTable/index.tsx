import { useEffect, useRef } from "react";

import { useDevices } from "../../../hooks/useDevices";

import Table from "./Table";
import TableActions from "./TableActions";

const DataTable = () => {
  const { isFetching, data, refetch } = useDevices();

  const fetchControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchControllerRef.current = controller;

    refetch(controller.signal);

    return () => {
      controller?.abort();
    };
  }, [refetch]);

  return (
    <div>
      <TableActions refetch={refetch} />
        <Table devices={data} isPending={isFetching} />
    </div>
  );
};

export default DataTable;
