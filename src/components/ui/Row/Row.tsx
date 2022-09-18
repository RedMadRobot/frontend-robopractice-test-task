import React from 'react';
import { RowProps, DayType } from '@/types';
import { randomId, getDifferenceTimes } from '@/utils';
import { RowElem, Item } from './StyledComponents';

export const Row = ({ row }: RowProps) => {
  const { Days, Fullname } = row;

  return (
    <RowElem>
      <Item>{Fullname}</Item>
      {Days.map((day: DayType) => (
        <Item key={randomId()}>{getDifferenceTimes(day.End, day.Start)}</Item>
      ))}
    </RowElem>
  );
};
