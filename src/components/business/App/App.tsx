import React, { useDeferredValue, useEffect, useState } from 'react';
import { Wrapper } from './StyledComponents';
import { Search, Table, Pagination, Limit } from '@/components';
import { UserService } from '@/service';
import { RowType } from '@/types';

export const App = () => {
  const [search, setSearch] = useState('');
  const [table, setTable] = useState([]);
  const deferredSearch = useDeferredValue(search);
  const [limit, setLimit] = useState('25');

  const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(evt.target.value);

  const handleLimit = (evt: any) => setLimit(evt.target.value);

  console.log(limit);

  useEffect(() => {
    UserService.getStatistics().then((dataTable) => setTable(dataTable));
  }, []);

  const filtered = table.filter(
    (element: RowType, index: number) =>
      index < Number(limit) &&
      element.Fullname.toLowerCase().includes(deferredSearch.toLowerCase())
  );

  return (
    <Wrapper>
      <Search search={search} onSearch={handleSearch} />
      <Table table={filtered} />
      <Limit limit={limit} onLimit={handleLimit} />
      <Pagination />
    </Wrapper>
  );
};
