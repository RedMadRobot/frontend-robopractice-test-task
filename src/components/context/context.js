import React, { useState, createContext, useEffect } from 'react';
import { getUsers } from '../../api/actions';

export const DataStorageContext = createContext();

// eslint-disable-next-line react/prop-types
export const DataStorageContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const [headings, setHeadings] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const updateData = (dump) => setData(dump);

  const updateHeadings = (dump) => {
    const initialHeaders = dump.pop().Days;
    setHeadings(initialHeaders);
  };

  const initData = (dump) => {
    setData(dump);
    setDefaultData(dump);
    updateHeadings(dump);
  };

  useEffect(() => {
    getUsers(initData); // save fetch result into data (temp) and defaultData
    setLoading(false); // hide load state
  }, []);

  const value = {
    data,
    updateData,
    isLoading,
    defaultData,
    setDefaultData,
    initData,
    headings,
    updateHeadings,
  };

  return (
    <DataStorageContext.Provider value={value}>
      {children}
    </DataStorageContext.Provider>
  );
};

export const SearchContext = createContext('');
