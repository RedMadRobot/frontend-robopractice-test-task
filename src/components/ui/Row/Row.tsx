import React from 'react';
import { RowProps, DayType } from '@/types';
import { randomId, getDifferenceTimes, getCountTimes } from '@/utils';
import { RowElem, Item, Resize } from './StyledComponents';

export const Row = ({ row }: RowProps) => {
  const { Days, Fullname } = row;

  return (
    <RowElem>
      <Item>{Fullname}</Item>
      {Days.map((day: DayType) => (
        <Item key={randomId()}>
          <Resize>{getDifferenceTimes(day.End as string, day.Start as string)}</Resize>
        </Item>
      ))}
      <Item>{getCountTimes(Days)}</Item>
    </RowElem>
  );
};
