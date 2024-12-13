import { FC } from "react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

import { IDevice } from "../../../../types/devices.types";

import DeviceType from "./DeviceType";
import RefreshButton from "./RefreshButton";
import SearchBar from "./SearchBar";
import SortBy from "./SortBy";

const TableActions: FC<{ refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<IDevice[], Error>> }> = ({
  refetch
}) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex space-x-3">
        <SearchBar />
        <DeviceType />
        <SortBy />
      </div>

      <RefreshButton onClick={refetch} />
    </div>
  );
};

export default TableActions;
