import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import TextField from '@mui/material/TextField';

import Paper from '@mui/material/Paper';

import { Container } from '@mui/system';

//import { DataManagerContext } from '../context/context';
import EnhancedTableHead from '../tablehead/tablehead';

function createData(fullname, calories, fat, carbs, protein) {
  return {
    fullname,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const requestSearch = (event) => {
  const val =
    event.target.value === '' ? 'give default array' : 'show filtered array';
  console.log(val);
};

export default function EnhancedTable() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //const [defaultData] = useContext(DataManagerContext);
  //console.log(defaultData);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }} className="paper-box">
        <Container maxWidth="false" className="container-inner search-box">
          <TextField
            id="standard-search"
            label="Search field"
            type="search"
            variant="standard"
            className="search-bar"
            fullWidth
            onChange={(searchVal) => requestSearch(searchVal)}
          />
        </Container>

        <Container maxWidth="false" className="container-inner">
          <TableContainer sx={{ maxHeight: 480 }}>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              aria-label="simple table"
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        tabIndex={-1}
                        key={row.fullname}
                        className="table-body-row"
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          className="sticky-item table-cell"
                        >
                          {row.fullname}
                        </TableCell>
                        <TableCell
                          align="right"
                          className="table-body-item table-cell"
                        >
                          {row.calories}
                        </TableCell>
                        <TableCell
                          align="right"
                          className="table-body-item table-cell"
                        >
                          {row.fat}
                        </TableCell>
                        <TableCell
                          align="right"
                          className="table-body-item table-cell"
                        >
                          {row.carbs}
                        </TableCell>
                        <TableCell
                          align="right"
                          className="sticky-item table-cell"
                          style={{ right: 0 }}
                        >
                          {row.protein}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
