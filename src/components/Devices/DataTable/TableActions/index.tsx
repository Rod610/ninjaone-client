import { FC } from "react";

import DeviceType from "./DeviceType";
import RefreshButton from "./RefreshButton";
import SearchBar from "./SearchBar";
import SortBy from "./SortBy";

const TableActions: FC<{ refetch: () => Promise<void> }> = ({ refetch }) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex-col space-y-3 lg:flex md:flex-row lg:space-x-3 lg:space-y-0">
        <SearchBar />
        <DeviceType />
        <SortBy />
      </div>

      <RefreshButton onClick={refetch} />
    </div>
  );
};

export default TableActions;
