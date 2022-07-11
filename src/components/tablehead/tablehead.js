import React from 'react';

import PropTypes from 'prop-types';

import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import TableHead from '@mui/material/TableHead';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Box } from '@mui/system';

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

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  //const [defaultData] = useContext(DataManagerContext);

  /* const { days: Days } = defaultData[0];

  console.log(days); */

  //const daysNum = getDaysNumInMonth();

  const headCells = [
    {
      id: 'Fullname',
      numeric: false,
      disablePadding: true,
      label: 'Full name',
    },
    {
      id: 'calories',
      numeric: true,
      disablePadding: false,
      label: 'Calories',
    },
    {
      id: 'fat',
      numeric: true,
      disablePadding: false,
      label: 'Fat (g)',
    },
    {
      id: 'carbs',
      numeric: true,
      disablePadding: false,
      label: 'Carbs (g)',
    },
    {
      id: 'protein',
      numeric: true,
      disablePadding: false,
      label: 'Protein (g)',
    },
  ];

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
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
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
