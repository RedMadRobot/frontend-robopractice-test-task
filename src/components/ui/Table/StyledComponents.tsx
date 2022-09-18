import styled from 'styled-components';
import variables from '@/Variables.module.scss';

const TableElem = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const RowElem = styled.tr`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const Th = styled.th`
  display: inline;
  font-size: 14px;
  color: ${variables.black000};

  &:first-of-type {
    width: 90px;
    text-align: left;
  }
`;

export { TableElem, RowElem, Th };