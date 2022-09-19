import styled from 'styled-components';
import variables from '@/Variables.module.scss';

const TableElem = styled.table`
  width: 100%;
  min-width: 1360px;
  border-collapse: collapse;
  overflow-x: auto;

  th:first-of-type,
  td:first-of-type {
    position: sticky;
    left: 0;
    z-index: 2;
    background-color: ${variables.white000};
  }

  th:last-of-type,
  td:last-of-type {
    position: sticky;
    right: 0;
    z-index: 2;
    background-color: ${variables.white000};
  }
`;

const Th = styled.th`
  font-size: 13px;
  width: 3%;
  color: ${variables.black000};

  &:first-of-type {
    width: 90px;
    text-align: left;
  }
`;

export { TableElem, Th };
