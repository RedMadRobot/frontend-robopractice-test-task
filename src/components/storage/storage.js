//import { useContext /* useEffect */ } from 'react';
//import { DataManagerContext } from '../context/context';
import /* fetchData */ '../../modules/fetchdata';

const DataStorage = () => {
  //const { updateData } = useContext(DataManagerContext);
  // template data
  //updateData(rows);
  /* useEffect(() => {
    const response = fetchData('http://localhost:8080/api/users', {
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Access-Type': 'application/json',
      },
      host: 'localhost',
      port: '8080',
    });

    response.then((result) => updateData(result));
  }, []); */
};

export default DataStorage;
