import React, { useDeferredValue, useEffect, useState } from 'react';
import { Wrapper, Inner } from './StyledComponents';
import { Search, Table, Pagination, Limit } from '@/components';
import { UserService } from '@/service';
import { RowType } from '@/types';

export const App = () => {
  const [search, setSearch] = useState('');
  const [table, setTable] = useState([]);
  const deferredSearch = useDeferredValue(search);
  const [limit, setLimit] = useState('25');
  const [page, setPage] = useState(0);

  const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(evt.target.value);

  const handleLimit = (evt: any) => setLimit(evt.target.value);

  const handlePage = (number: number) => setPage(number);

  console.log(page);

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
      <Inner>
        <Limit limit={limit} onLimit={handleLimit} />
        <Pagination page={page} onPage={handlePage} />
      </Inner>
    </Wrapper>
  );
};
