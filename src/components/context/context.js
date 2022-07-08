import React, { useState, createContext } from 'react';
import { templateData } from '../../modules/templatedata';

export const DataManagerContext = createContext();

// eslint-disable-next-line react/prop-types
export const DataManagerContextProvider = ({ children }) => {
  const [data, setData] = useState(templateData);

  // setter and getter
  const updateData = (dump) => setData(dump);

  const value = { data, updateData };

  return (
    <DataManagerContext.Provider value={value}>
      {children}
    </DataManagerContext.Provider>
  );
};

export const SearchContext = createContext('');

// eslint-disable-next-line react/prop-types
export const SearchContextProvider = ({ children }) => {
  const [search, setSearch] = useState('');

  const value = { search, setSearch };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
