import React, { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { Wrapper } from './StyledComponents';
import { Search, Table } from '@/components';
import { UserService } from '@/service';
import { RowType } from '@/types';

export const App = () => {
  const [search, setSearch] = useState('');
  const [table, setTable] = useState([]);
  const deferredValue = useDeferredValue(search);

  const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(evt.target.value);

  useEffect(() => {
    UserService.getStatistics().then((dataTable) => setTable(dataTable));
  }, []);

  const filtered = useMemo(() => {
    return table.filter((element: RowType) => {
      return element.Fullname.toLowerCase().includes(deferredValue.toLowerCase());
    });
  }, [deferredValue]);

  return (
    <Wrapper>
      <Search search={search} onSearch={handleSearch} />
      <Table table={filtered} />
    </Wrapper>
  );
};
