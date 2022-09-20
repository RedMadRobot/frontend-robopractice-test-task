import type { RowType } from '@/types';

type FilteredDataType = {
  table: Array<RowType>;
  page: number;
  limit: number;
  deferredSearch: string;
};

export const filteredData = ({ table, page, limit, deferredSearch }: FilteredDataType) =>
  table.filter(
    (element: RowType, index: number) =>
      index <= page * limit &&
      index >= page * limit - limit &&
      element.Fullname.toLowerCase().includes(deferredSearch.toLowerCase())
  );
