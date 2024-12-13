import { FC } from "react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

import RefreshIcon from "../../../../../assets/ActionIcons/RefreshIcon.svg?react";
import { REFRESH_LABEL } from "../../../../../constants/labels";
import { IDevice } from "../../../../../types/devices.types";

const RefreshButton: FC<{ onClick: (options?: RefetchOptions) => Promise<QueryObserverResult<IDevice[], Error>> }> = ({
  onClick,
}) => {
  return (
    <button type="button" onClick={onClick} className="rounded-md bg-white text-gray-400 hover:text-gray-500">
      <span className="sr-only">{REFRESH_LABEL}</span>
      <RefreshIcon aria-hidden="true" className="size-6" />
    </button>
  );
};

export default RefreshButton;
