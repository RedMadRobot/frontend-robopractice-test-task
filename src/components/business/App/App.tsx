import React, { useEffect, useState } from 'react';
import { Wrapper } from './StyledComponents';
import { Search, Table } from '@/components';
import { UserService } from '@/service';

export const App = () => {
  const [search, setSearch] = useState('');
  const [table, setTable] = useState([]);

  const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(evt.target.value);

  useEffect(() => {
    UserService.getStatistics().then((dataTable) => setTable(dataTable));
  }, []);

  return (
    <Wrapper>
      <Search search={search} onSearch={handleSearch} />
      <Table table={table} />
    </Wrapper>
  );
};
