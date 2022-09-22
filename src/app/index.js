import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from './components/UserTable.js';
import UserSelect from './components/UserSelect.js';
import './styles/main.css';
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
    <section className='main'>
      <header className='main__header'>
        <h1 className='main__title'>User's table</h1>
        <UserSelect
          updateData={updateData}
          users={users}
          className='main__select'
        />
      </header>
      <UserTable users={userData} />
    </section>
  );
};
