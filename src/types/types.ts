type DateType = {
  Date: string;
  End: string;
  Start: string;
};

type RowType = {
  Days: DateType[];
  Fullname: string;
  id: number;
};

type TableProps = {
  table: RowType[];
};

type RowProps = {
  row: RowType;
};

type DayType = {
  Date: string;
  End: string;
  Start: string;
};

export type { TableProps, RowProps, DayType };
