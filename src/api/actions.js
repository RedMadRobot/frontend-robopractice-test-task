import { fetchData } from "../modules/fetchdata";

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

    response.then((result) => callback(result));
}