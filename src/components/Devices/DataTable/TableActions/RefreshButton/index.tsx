import { FC } from "react";

import RefreshIcon from "../../../../../assets/ActionIcons/RefreshIcon.svg?react";
import { REFRESH_LABEL } from "../../../../../constants/labels";
import { useDevices } from "../../../../../hooks/useDevices";

const RefreshButton: FC = () => {
  const { refetch } = useDevices();

  return (
    <button type="button" onClick={() => refetch()} className="rounded bg-white active:bg-slate-100 p-2">
      <span className="sr-only">{REFRESH_LABEL}</span>
      <RefreshIcon aria-hidden="true" className="size-6" />
    </button>
  );
};

export default RefreshButton;
