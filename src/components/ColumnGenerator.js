import { daysInMonth } from "./UsersTable/utils/constants";

    // const handleResize =
    //   (index) =>
    //   (_, { size }) => {
    //     const newColumns = [...columns];
    //     newColumns[index] = { ...newColumns[index], width: size.width };
    //     setColumns(newColumns);
    //   };

    // const mergeColumns = columns.map((col, index) => ({
    //   ...col,
    //   onHeaderCell: (column) => ({
    //     width: column.width,
    //     onResize: handleResize(index),
    //   }),
    // }));

const usersColumn = {
  title: 'User',
  dataIndex: 'Fullname',
  key: 'Fullname',
  fixed: 'left',
  width: 100,
  sorter: (a, b) => a.Fullname.localeCompare(b.Fullname),
};

const monthTotalColumn = {
  title: 'Monthly total',
  dataIndex: 'totalTimes',
  key: 'montlyTotal',
  align: 'right',
  fixed: 'right',
  width: 80,
};

const daysColumns = [...Array(daysInMonth).keys()]
  .map((key) => key + 1)
  .map((day) => ({
    title: day,
    dataIndex: day,
    key: day,
    align: 'right',
    width: 40,
    sorter: (a, b) => a.day - b.day,
    // sorter: (prev, next) => sortByTime(prev, next, day),
  }));

export function ColumnGenerator() {
  return [usersColumn, ...daysColumns, monthTotalColumn];
};
