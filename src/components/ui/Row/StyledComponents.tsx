import styled from 'styled-components';
import variables from '@/Variables.module.scss';

const RowElem = styled.tr`
  border-bottom: 1px solid ${variables.black100};
`;

const Item = styled.td`
  font-size: 14px;
  color: ${variables.black000};
  padding: 28px 0;
  width: 3%;

  &:first-of-type {
    width: 90px;
    text-align: left;
  }
`;

export { RowElem, Item };
