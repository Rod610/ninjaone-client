export const DeviceEnpoints = {
  getDevices: () => "devices",
  getDevice: (id: string) => `devices/${id}`,
  deleteDevice: (id: string) => `devices/${id}`,
  postDevices: () => "devices",
  putDevice: (id: string) => `devices/${id}`
};
