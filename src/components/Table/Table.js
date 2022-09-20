import { Table } from "antd";
import { Api } from "../Api/Api";

const dataSource = [
    {Api}
];

const columns = [
    {
    title: 'User',
    dataIndex: 'Fullname',
    key: 'id',
    },
    {
    title: '1',
    dataIndex: 'Date.2021-05-01',
    key: 'Date.2021-05-01',
    },
    {
    title: '2',
    dataIndex: 'Date.2021-05-02',
    key: 'Date.2021-05-02',
    },
    {
    title: '3',
    dataIndex: 'Date.2021-05-03',
    key: 'Date.2021-05-03',
    },
    {
    title: '4',
    dataIndex: 'Date.2021-05-04',
    key: 'Date.2021-05-04',
    },
    {
    title: '5',
    dataIndex: 'Date.2021-05-05',
    key: 'Date.2021-05-05',
    },
];

export default function UsersTable() {
    return (
        <Table dataSource={dataSource} columns={columns} />
)}
