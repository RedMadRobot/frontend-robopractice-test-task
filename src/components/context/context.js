import React, { useState, createContext, useEffect } from 'react';
import { getUsers } from '../../api/actions';

export const DataStorageContext = createContext();

// eslint-disable-next-line react/prop-types
export const DataStorageContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [defaultData, setDefaultData] = useState([]);

  const [isLoading, setLoading] = useState(true);

  const updateData = (dump) => setData(dump);
  const initData = (dump) => {
    setData(dump);
    setDefaultData(dump);
  }

  useEffect(() => {
    getUsers(initData); // save fetch result into data (temp) and defaultData
    setLoading(false); // hide load state
  }, []);

  const value = { data, updateData, isLoading, defaultData, setDefaultData };

  return (
    <DataStorageContext.Provider value={value}>
      {children}
    </DataStorageContext.Provider>
  );
};

export const SearchContext = createContext('');
