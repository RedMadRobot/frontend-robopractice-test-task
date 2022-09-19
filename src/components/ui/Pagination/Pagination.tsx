import React from 'react';
import { Next, Previous } from './StyledComponents';
import { PaginationProps } from './types';

export const Pagination = ({ page, onPage }: PaginationProps) => {
  return (
    <>
      <Next onClick={() => onPage(--page)} aria-label="Next" />
      <Previous onClick={() => onPage(++page)} aria-label="Previous" />
    </>
  );
};
