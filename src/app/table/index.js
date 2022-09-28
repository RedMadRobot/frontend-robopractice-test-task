import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableColumnResizing,
  PagingPanel,
  SearchPanel,
  Toolbar,
  TableFixedColumns,
  TableSelection,
} from '@devexpress/dx-react-grid-material-ui';
import {
  PagingState,
  IntegratedPaging,
  SearchState,
  IntegratedFiltering,
  IntegratedSorting,
  SortingState,
  TableColumnVisibility,
} from '@devexpress/dx-react-grid';
import { useSelector } from 'react-redux';
import { getUsers, getUI } from '../../selectors.js';

const BasicTable = () => {
  const users = useSelector(getUsers);
  const uiSettings = useSelector(getUI);
  const maxNumberDays = uiSettings.maxNumberDays;
  const arrColumns = [
    { name: 'id', title: 'id' },
    { name: 'fullName', title: 'User' },
  ];
  const columnWidth = [
    { columnName: 'id', width: 180 },
    { columnName: 'fullName', width: 180 },
    { columnName: 'monthly', width: 180 },
    ];
  const countDayInMonth = 30;
  for (let i = 0; i <= countDayInMonth; i += 1 ) {
    const columnDay = {
      name: `day${i}`,
      title: `${i + 1}`,
    };
    arrColumns.push(columnDay);
    columnWidth.push({columnName: `day${i}`, width: 100});
  } 


    const [columns] = useState(arrColumns);
    const [defaultColumnWidths] = useState(columnWidth);
   arrColumns.push({ name: 'monthly', title: 'Monthly' });

  const rows = users.map((user) => {
    const {id, fullName, monthly, fullMonth} = user;
    const days = {};
    fullMonth.forEach((day,i)=>(days[`day${i}`] = day));
    return  ({id, fullName, monthly, ...days});
  });
  const [tableColumnExtensions] = useState([
    { columnName: 'fullName', width: 150 },
  ]);
  const [leftColumns] = useState([TableSelection.COLUMN_TYPE, 'fullName']);
  const [rightColumns] = useState(['monthly']);

  const [searchValue, setSearchState] = useState('');
  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
      >
        <PagingState
          defaultCurrentPage={0}
          pageSize={10}
        />
        <SearchState
          value={searchValue}
          onValueChange={setSearchState}
        />
        <SortingState
          defaultSorting={[{ columnName: 'fullName', direction: 'asc' }]}
        />
         <IntegratedSorting />
        <IntegratedFiltering />
        <IntegratedPaging />

        <Table columnExtensions={tableColumnExtensions} />
        <TableColumnVisibility hiddenColumnNames={['id']}/>
        <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
        <TableHeaderRow showSortingControls/>
        <Toolbar />
        <SearchPanel />
        <PagingPanel />
        <TableFixedColumns
          leftColumns={leftColumns}
          rightColumns={rightColumns}
        />
      </Grid>
    </Paper>
  );
};

export default BasicTable;
