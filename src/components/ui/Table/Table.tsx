import React from 'react';
import type { TableProps } from './types';
import { TableElem } from './StyledComponents';
import { randomId } from '@/utils';

export const Table = ({ table }: TableProps) => {
  const monthDays = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31,
  ];

  console.log(table[0]);

  return (
    <TableElem>
      <thead>
        <tr>
          <th>User</th>
          {monthDays.map((day) => (
            <th key={randomId()}>{day}</th>
          ))}
        </tr>
      </thead>
    </TableElem>
  );
};
