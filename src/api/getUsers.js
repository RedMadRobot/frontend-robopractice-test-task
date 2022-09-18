import axios from 'axios';
import routes from '../routes.js';

const getUsers = async () => {
  const path = routes.usersPath();
  const response = await axios.get(path);
  const { data } = response;
  return data;
};

export default getUsers;
