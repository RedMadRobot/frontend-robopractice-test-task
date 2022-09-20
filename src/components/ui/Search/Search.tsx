import React from 'react';
import { Form, Input } from './StyledComponents';
import { SearchProps } from './types';

export const Search = ({ search, onSearch }: SearchProps) => {
  return (
    <Form>
      <Input value={search} onChange={onSearch} type="text" placeholder="Search" />
    </Form>
  );
};
