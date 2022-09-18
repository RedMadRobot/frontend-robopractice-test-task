import React from 'react';
import { TableProps } from '@/types';
import { TableElem, RowElem, Th } from './StyledComponents';
import { randomId } from '@/utils';
import { Row } from '@/components';

export const Table = ({ table }: TableProps) => {
  const monthDays = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31,
  ];

  return (
    <TableElem>
      <thead>
        <RowElem>
          <Th>User</Th>
          {monthDays.map((day) => (
            <Th key={randomId()}>{day}</Th>
          ))}
        </RowElem>
      </thead>
      <tbody>
        {table.map((row) => (
          <Row key={randomId()} row={row} />
        ))}
      </tbody>
    </TableElem>
  );
};
