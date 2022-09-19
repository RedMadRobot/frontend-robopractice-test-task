import React, { memo } from 'react';
import { LimitProps } from './types';

export const Limit = memo(function LimitMemo({ limit, onLimit }: LimitProps) {
  return (
    <form>
      <select value={limit} onChange={onLimit}>
        <option defaultValue="25">25</option>
        <option value="15">15</option>
        <option value="10">10</option>
      </select>
    </form>
  );
});
