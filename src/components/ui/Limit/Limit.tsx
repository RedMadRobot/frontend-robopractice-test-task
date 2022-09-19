import React, { memo } from 'react';
import { LimitProps } from './types';
import { Form, Select, Text } from './StyledComponents';

export const Limit = memo(function LimitMemo({ limit, onLimit }: LimitProps) {
  return (
    <Form>
      <Text>Rows per page:</Text>
      <Select value={limit} onChange={onLimit}>
        <option defaultValue="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
      </Select>
    </Form>
  );
});
