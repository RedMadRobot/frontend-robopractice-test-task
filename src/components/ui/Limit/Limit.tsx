import React, { memo } from 'react';
import { LimitProps } from './types';
import { Form } from './StyledComponents';

export const Limit = memo(function LimitMemo({ limit, onLimit }: LimitProps) {
  return (
    <Form>
      <select value={limit} onChange={onLimit}>
        <option defaultValue="25">25</option>
        <option value="15">15</option>
        <option value="10">10</option>
      </select>
    </Form>
  );
});
