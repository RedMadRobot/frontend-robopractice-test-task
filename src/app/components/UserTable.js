import React from 'react';
import ResizableAntdTable from 'resizable-antd-table';
import { mappedUsers, getColumns } from '../utils/dataMapper.js';

const UserTable = ({ users }) => {
  const dataSource = mappedUsers(users);
  const columns = getColumns();

  return (
    <ResizableAntdTable dataSource={dataSource} columns={columns} bordered />
  );
};

export default UserTable;
