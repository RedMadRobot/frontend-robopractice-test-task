import { useState } from 'react';
import { Table } from 'antd';
import Data from '../Data';
import { Api } from '../Api/Api';



const columns = [
  {
    title: 'User',
    dataIndex: 'Fullname',
    key: 'id',
  },
  {
    title: '1',
    dataIndex: '',
    key: '1',
  },
  {
    title: '2',
    dataIndex: '',
    key: '2',
  },
  {
    title: 'Monthly total',
    dataIndex: '',
    key: '3',
  },
];

export default function UsersTable() {

  const [users, setUsers] = useState([]);

  Api()
    .then((users) => setUsers(users))
    .catch((err) => console.log(err));
  
  return <Table dataSource={users} columns={columns} />;
}
