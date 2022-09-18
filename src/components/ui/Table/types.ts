type DateType = {
  Date: string;
  End: string;
  Start: string;
};

type TableType = {
  Days: DateType[];
  Fullname: string;
  id: number;
};

type TableProps = {
  table: TableType[];
};

export type { TableProps };
