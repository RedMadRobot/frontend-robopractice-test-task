import React, { memo } from 'react';
import { TableProps } from '@/types';
import { TableElem, Th } from './StyledComponents';
import { randomId, MONTH_DAYS } from '@/utils';
import { Row } from '@/components';

export const Table = memo(function TableMemo({ table }: TableProps) {
  return (
    <TableElem>
      <thead>
        <tr>
          <Th>User</Th>
          {MONTH_DAYS.map((day) => (
            <Th key={randomId()}>{day}</Th>
          ))}
          <Th>Monthly total</Th>
        </tr>
      </thead>
      <tbody>
        {table.map((row) => (
          <Row key={randomId()} row={row} />
        ))}
      </tbody>
    </TableElem>
  );
});
