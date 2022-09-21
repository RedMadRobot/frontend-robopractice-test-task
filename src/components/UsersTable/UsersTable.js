
import { Table } from 'antd';
import Data from '../Data';

import dayjs from 'dayjs';
import { ColumnGenerator } from '../ColumnGenerator';
import { daysInMonth } from './utils/constants';

// const columns = [
//   {
//     title: 'User',
//     dataIndex: 'Fullname',
//     key: 'id',
//     fixed: 'left',
//     width: 200,
//     render: (fullname) => fullname,
//     sorter: (a, b) => a.Fullname.localeCompare(b.Fullname),
//   },
//   {
//     title: '1',
//     dataIndex: '',
//     key: '',
//   },
//   {
//     title: '2',
//     dataIndex: '',
//     key: '2',
//   },
//   {
//     title: 'Monthly total',
//     dataIndex: '',
//     key: '3',
//     align: 'right',
//     fixed: 'right',
//     width: 200,
//   },
// ];

export default function UsersTable() {
  

  return (
    <Table
      dataSource={Data()}
      columns={ColumnGenerator()}
      scroll={{ x: 'max-content' }}
      bordered
    />
  );
}