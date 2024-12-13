import { IDevice } from "../../../types/devices.types";
import { IDeviceQuery } from "../../../types/query.types";
import { filterByQuery } from "../../../utils/filters";
import { mapDevices } from "../../../utils/mapDevices";

import DeviceService from "./service";

export default class DeviceQueryMethods {
  public static readonly getAllDevices = async (query: IDeviceQuery): Promise<IDevice[]> => {
    const { data } = await DeviceService.getDevices();

    const mappedDevices = mapDevices(data);

    const filteredDevices = filterByQuery(mappedDevices, query);
    return filteredDevices;
  };

  public static readonly getDeviceById = async (id: string): Promise<IDevice> => {
    const { data } = await DeviceService.getDeviceById(id);

    return data;
  };
}
