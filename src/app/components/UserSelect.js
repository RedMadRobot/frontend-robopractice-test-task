import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

const UserSelect = ({ users, updateData }) => {
  const handleSelect = (value) => {
    updateData(value);
  };
  const handleClear = () => {
    updateData();
  };

  const options = users.map((elem) => {
    return <Option key={elem.id} value={elem.Fullname}></Option>;
  });

  return (
    <Select
      showSearch
      style={{
        width: 200,
      }}
      placeholder='Search user'
      onSelect={handleSelect}
      allowClear
      onClear={handleClear}
    >
      {options}
    </Select>
  );
};

export default UserSelect;
