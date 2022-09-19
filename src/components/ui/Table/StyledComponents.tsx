import styled from 'styled-components';
import variables from '@/Variables.module.scss';

const TableElem = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const RowElem = styled.tr``;

const Th = styled.th`
  font-size: 14px;
  width: 3%;
  color: ${variables.black000};

  &:first-of-type {
    width: 90px;
    text-align: left;
  }
`;

export { TableElem, RowElem, Th };
