import React from 'react';
import ResizableAntdTable from 'resizable-antd-table';
import { mappedUsers, getColumns } from '../dataMapper.js';

const UserTable = ({ users }) => {
  const dataSource = mappedUsers(users);
  const columns = getColumns();

  return (
    <ResizableAntdTable
      dataSource={dataSource}
      columns={columns}
      pagination={true}
      bordered
         />
  );
};

export default UserTable;
