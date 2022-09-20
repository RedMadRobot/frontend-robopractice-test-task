type RowType = {
  Days: DayType[];
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
  Date: string | null;
  End: string | null;
  Start: string | null;
};

export type { TableProps, RowType, RowProps, DayType };
