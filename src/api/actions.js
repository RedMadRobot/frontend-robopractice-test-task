import { fetchData } from '../modules/fetchdata';
import { createData } from '../modules/createdata';

export const getUsers = (callback) => {
  const response = fetchData('http://localhost:8080/api/users', {
    method: 'GET',
    header: {
      'Content-Type': 'application/json',
      'Access-Type': 'application/json',
    },
    host: 'localhost',
    port: '8080',
  });

  response
    .then((response) => createData(response))
    .then((result) => callback(result));
};
