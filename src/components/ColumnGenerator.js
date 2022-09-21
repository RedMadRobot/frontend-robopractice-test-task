import HandledUsersData from "./HandledUsersData";
import { daysInMonth } from "./UsersTable/utils/constants";

const usersColumn = {
  title: 'User',
  dataIndex: 'Fullname',
  key: 'id',
  fixed: 'left',
  width: 100,
  sorter: (a, b) => a.Fullname.localeCompare(b.Fullname),
};

const monthTotalColumn = {
  title: 'Monthly total',
  dataIndex: 'sum',
  key: 'sum',
  align: 'right',
  fixed: 'right',
  width: 100,
};

const daysColumns = [...Array(daysInMonth).keys()]
  .map((key) => key + 1)
  .map((day) => ({
    title: day,
    dataIndex: day,
    key: day,
    align: 'right',
    width: 100,
    // render: (obj) => (!obj ? '0' : `${obj.hours}:${obj.minutes}`),
    // sorter: (prev, next) => sortByTime(prev, next, day),
  }))

export function ColumnGenerator() {
  return [usersColumn, ...daysColumns, monthTotalColumn];
};
