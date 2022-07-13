import React, { useState, useContext } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';

import { DataStorageContext } from '../context/context';
import EnhancedTableHead from '../tablehead/tablehead';

import { stableSort, getComparator } from '../../modules/sorting';
import Searchbar from '../searchbar/searchbar';
import { getPassDate, parseClockTime } from '../../api/createdata';

const EnhancedTable = () => {
  const { data, isLoading, updateData, defaultData } =
    useContext(DataStorageContext);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('Fullname');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const searchField = 'Fullname';

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  if (isLoading) {
    return (
      <Box>
        <Paper></Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }} className="paper-box">
        <Container maxWidth="false" className="container-inner search-box">
          <Searchbar
            field={searchField}
            rows={data}
            updateRows={updateData}
            copyRows={defaultData}
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
                rowCount={data.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(data, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-row-name-${index}`;
                    return (
                      <TableRow
                        tabIndex={-1}
                        key={row.Fullname}
                        className="table-body-row"
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          className="sticky-item table-cell"
                        >
                          {row.Fullname}
                        </TableCell>

                        {row.Days.map(({ Date, Start, End, sumDay }) => (
                          <TableCell
                            key={`${row.id}-${Date}`}
                            align="right"
                            className="table-body-item table-cell"
                            aria-label={
                              sumDay
                                ? `${Date}: c ${parseClockTime(
                                    Start,
                                    '-'
                                  )} до ${parseClockTime(End, '-')}`
                                : `${Date}: 0`
                            }
                            title={
                              sumDay
                                ? `${Date}: c ${parseClockTime(
                                    Start,
                                    '-'
                                  )} до ${parseClockTime(End, '-')}`
                                : `${Date}: 0`
                            }
                          >
                            {sumDay ? getPassDate(sumDay, ':') : 0}
                          </TableCell>
                        ))}

                        <TableCell
                          align="right"
                          className="sticky-item table-cell"
                          style={{ right: 0 }}
                          aria-label={`Суммарное время: ${getPassDate(
                            row.totalSum,
                            ':'
                          )}`}
                          title={`Суммарное время: ${getPassDate(
                            row.totalSum,
                            ':'
                          )}`}
                        >
                          {getPassDate(row.totalSum, ':')}
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
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default EnhancedTable;
