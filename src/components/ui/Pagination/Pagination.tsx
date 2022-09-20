import React from 'react';
import { Next, Previous } from './StyledComponents';
import { PaginationProps } from './types';

export const Pagination = ({ page, onPage, countPage }: PaginationProps) => {
  return (
    <>
      <Next onClick={() => onPage(page > 1 ? --page : 0)} aria-label="Next" />
      <Previous
        onClick={() => onPage(page < countPage ? ++page : 0)}
        aria-label="Previous"
      />
    </>
  );
};
