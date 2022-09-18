import styled from 'styled-components';
import variables from '@/Variables.module.scss';

const RowElem = styled.tr`
  border-bottom: 1px solid ${variables.black100};
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const Item = styled.td`
  font-size: 14px;
  color: ${variables.black000};
  padding: 28px 0;
  text-align: center;
  display: inline;

  &:first-of-type {
    width: 90px;
    text-align: left;
  }
`;

export { RowElem, Item };
