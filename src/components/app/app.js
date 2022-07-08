import React from 'react';

import EnhancedTable from '../table/table';
import { DataManagerContextProvider } from '../context/context';
import DataStorage from '../storage/storage';

const App = () => {
  return (
    <DataManagerContextProvider>
      <DataStorage />
      <EnhancedTable />
    </DataManagerContextProvider>
  );
};

export default App;
