import { useState } from "react";

import { DevicesProvider } from "../../context/DevicesContext";

import AddDeviceModal from "./AddDeviceModal";
import DataTable from "./DataTable";
import Header from "./Header";

const Devices = () => {
  const [showAddDeviceModal, setAddDeviceModal] = useState(false);

  return (
    <div className="min-w-full">
      <Header setAddDeviceModal={setAddDeviceModal} />
      <DevicesProvider>
        <DataTable />
        <AddDeviceModal show={showAddDeviceModal} setShow={setAddDeviceModal} />
      </DevicesProvider>
    </div>
  );
};

export default Devices;
