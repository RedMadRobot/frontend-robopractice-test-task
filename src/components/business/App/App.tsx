import React, { useDeferredValue, useEffect, useState } from 'react';
import { Wrapper, Inner, Text } from './StyledComponents';
import { Search, Table, Pagination, Limit } from '@/components';
import { UserService } from '@/service';
import { RowType } from '@/types';

export const App = () => {
  const [search, setSearch] = useState('');
  const [table, setTable] = useState([]);
  const [filterTable, setFilterTable] = useState([]);
  const deferredSearch = useDeferredValue(search);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState(0);

  const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(evt.target.value);

  const handleLimit = (evt: React.ChangeEvent<HTMLSelectElement>) =>
    setLimit(Number(evt.target.value));

  const handlePage = (number: number) =>
    number > 0 && number <= countPage && setPage(number);

  useEffect(() => {
    UserService.getStatistics().then((dataTable) => setTable(dataTable));
  }, []);

  const filtered = table.filter(
    (element: RowType, index: number) =>
      index <= page * limit &&
      index >= page * limit - limit &&
      element.Fullname.toLowerCase().includes(deferredSearch.toLowerCase())
  );

  useEffect(() => setCountPage(Math.ceil(table.length / limit)), [table, limit]);

  useEffect(() => setFilterTable(filtered), [table, page, limit, deferredSearch]);

  return (
    <Wrapper>
      <Search search={search} onSearch={handleSearch} />
      <Table table={filterTable} />
      <Inner>
        <Limit limit={limit} onLimit={handleLimit} />
        <Text>{`${page * limit - limit}-${page * limit} of ${table.length}`}</Text>
        <Pagination page={page} onPage={handlePage} countPage={countPage} />
      </Inner>
    </Wrapper>
  );
};
