import { useState } from "react";

import AddDeviceModal from "./AddDeviceModal";
import DataTable from "./DataTable";
import Header from "./Header";

const Devices = () => {
  const [showAddDeviceModal, setAddDeviceModal] = useState(false);

  return (
    <div className="min-w-full">
      <Header setAddDeviceModal={setAddDeviceModal} />
      <DataTable />
      <AddDeviceModal show={showAddDeviceModal} setShow={setAddDeviceModal} />
    </div>
  );
};

export default Devices;
