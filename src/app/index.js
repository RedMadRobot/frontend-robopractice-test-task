import UsersTable from '../components/UsersTable/UsersTable';
import { useEffect, useState } from 'react';
import Api from '../components/Api/Api';
import HandledUsersData from '../components/HandledUsersData';

export const App = () => {

  const [data, setData] = useState([]);
  useEffect(() => {
    Api()
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <UsersTable dataSourse={HandledUsersData(data)}></UsersTable>
    </>
  );
};
