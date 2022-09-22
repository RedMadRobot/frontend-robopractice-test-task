export type DataType = {
  id: number;
  Fullname: string;
  Days: string[];
};

export type initialTypeUsers = {
  items: DataType[];
  loading: boolean;
  search: string;
  itemsLength: number;
};

export type initialTypePagination = {
  lastPage: number;
  firstItem: number;
  lastItem: number;
  stepPage: number;
};
