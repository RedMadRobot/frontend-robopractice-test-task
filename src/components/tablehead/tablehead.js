import React, { useContext } from 'react';

import PropTypes from 'prop-types';

import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import TableHead from '@mui/material/TableHead';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Box } from '@mui/system';
import { DataStorageContext } from '../context/context';

//import getDaysNumInMonth from '../../modules/countdays';
//import { DataManagerContext } from '../context/context';

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const { isLoading, headings } = useContext(DataStorageContext);

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const headCells = [
    {
      id: 'Fullname',
      numeric: false,
      disablePadding: true,
      label: 'Full Name',
      hint: 'Full Name',
    },
    {
      id: 'totalsum',
      numeric: false,
      disablePadding: false,
      label: 'Total Sum',
      hint: 'Total Sum',
    },
  ];

  const createHeadCell = (val) => {
    // eslint-disable-next-line no-unused-vars
    const [y, m, d] = val.split('-');

    return {
      id: val,
      numeric: false,
      disablePadding: false,
      label: d,
      hint: val,
    };
  };

  const [StartCell, EndCell] = headCells;

  if (isLoading) {
    return <></>;
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell
          key={StartCell.id}
          align={StartCell.numeric ? 'right' : 'left'}
          padding={'normal'}
          sortDirection={orderBy === StartCell.id ? order : false}
          className={'table-head-item sticky-item table-cell'}
        >
          <TableSortLabel
            active={orderBy === StartCell.id}
            direction={orderBy === StartCell.id ? order : 'asc'}
            onClick={createSortHandler(StartCell.id)}
            aria-label={StartCell.hint}
            title={StartCell.hint}
          >
            {StartCell.label}
            {orderBy === StartCell.id ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        {headings.map(({ Date }) => {
          const headCell = createHeadCell(Date);

          return (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              className={'table-head-item sticky-item table-cell'}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                aria-label={headCell.hint}
                title={headCell.hint}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          );
        })}

        <TableCell
          key={EndCell.id}
          align={EndCell.numeric ? 'right' : 'left'}
          padding={'normal'}
          sortDirection={orderBy === EndCell.id ? order : false}
          className={'table-head-item sticky-item table-cell'}
        >
          <TableSortLabel
            active={orderBy === EndCell.id}
            direction={orderBy === EndCell.id ? order : 'asc'}
            onClick={createSortHandler(EndCell.id)}
            aria-label={EndCell.hint}
            title={EndCell.hint}
          >
            {EndCell.label}
            {orderBy === EndCell.id ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
