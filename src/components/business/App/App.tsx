import React, { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { Wrapper } from './StyledComponents';
import { Search, Table } from '@/components';
import { UserService } from '@/service';
import { RowType } from '@/types';

export const App = () => {
  const [search, setSearch] = useState('');
  const [table, setTable] = useState([]);
  const deferredSearch = useDeferredValue(search);

  const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(evt.target.value);

  useEffect(() => {
    UserService.getStatistics().then((dataTable) => setTable(dataTable));
  }, []);

  const filtered = table.filter((element: RowType) =>
    element.Fullname.toLowerCase().includes(deferredSearch.toLowerCase())
  );

  return (
    <Wrapper>
      <Search search={search} onSearch={handleSearch} />
      <Table table={filtered} />
    </Wrapper>
  );
};
