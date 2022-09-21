import UsersTable from '../components/UsersTable/UsersTable';
import { useEffect, useState } from 'react';
import Api from '../components/Api/Api';

export const App = () => {

  const [data, setData] = useState([]);
  useEffect(() => {
    Api()
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <UsersTable></UsersTable>
    </>
  );
};
