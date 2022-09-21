import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from './components/UserTable.js';
import UserSelect from './components/UserSelect.js';
export const App = () => {
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState();
  const updateData = (value) => {
    setValue(value);
  };
  
  const userData = value
    ? users.filter(({ Fullname }) => Fullname === value)
    : users;
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:8080/api/users');
      setUsers(result.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>User's table</h1>
      <UserSelect updateData={updateData} users={users} />
      <UserTable users={userData} />
    </>
  );
};
