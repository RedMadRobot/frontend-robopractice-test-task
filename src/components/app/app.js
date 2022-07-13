import React from 'react';

import EnhancedTable from '../table/table';
import { DataStorageContextProvider } from '../context/context';

const App = () => {
  return (
    <DataStorageContextProvider>
      <EnhancedTable />
    </DataStorageContextProvider>
  );
};

export default App;
