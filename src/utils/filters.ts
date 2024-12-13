import { IDevice } from "../types/devices.types";
import { IDeviceQuery } from "../types/query.types";

const filterBySearch = (data: IDevice[], search: string) => {
  const searchInLowerCase = search.toLocaleLowerCase();
  return data.filter((device) => device.system_name.toLocaleLowerCase().includes(searchInLowerCase) || device.hdd_capacity.toString() === searchInLowerCase);
};

const filterByType = (data: IDevice[], type: string) => {
  return data.filter((device) => device.type === type);
};

const stableSort = (array: IDevice[], comparator: (a: IDevice, b: IDevice) => number) => {
  if (!array) return array;

  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a: Array<IDevice | number>, b: Array<IDevice | number>) => {
    const order = comparator(a[0] as IDevice, b[0] as IDevice);
    if (order !== 0) {
      return order;
    }
    return (a[1] as number) - (b[1] as number);
  });
  return stabilizedThis.map((el) => el[0] as IDevice);
};

const descendingComparator = (a: IDevice, b: IDevice, orderBy: string) => {
  if (b[orderBy as keyof IDevice] < a[orderBy as keyof IDevice]) {
    return -1;
  }
  if (b[orderBy as keyof IDevice] > a[orderBy as keyof IDevice]) {
    return 1;
  }
  return 0;
};

const getComparator = (order: string, orderBy: string) => {
  return order === "desc"
    ? (a: IDevice, b: IDevice) => descendingComparator(a, b, orderBy)
    : (a: IDevice, b: IDevice) => -descendingComparator(a, b, orderBy);
};

export const filterByQuery = (data: IDevice[], query: IDeviceQuery) => {
  let results = [...data];
  if (query.search !== "") {
    results = filterBySearch(results, query.search);
  }

  if (query.deviceType !== "") {
    results = filterByType(results, query.deviceType);
  }

  results = stableSort(results, getComparator(query.sortOptionOrder, query.sortOptionProperty));

  return results;
};
