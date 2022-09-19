import styled from 'styled-components';
import variables from '@/Variables.module.scss';

const TableElem = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow-x: auto;
  max-width: 1800px;

  th:first-of-type,
  td:first-of-type {
    position: sticky;
    left: 0;
    z-index: 2;
    background-color: aliceblue;
  }

  th:last-of-type,
  td:last-of-type {
    position: sticky;
    right: 0;
    z-index: 2;
    background-color: aliceblue;
  }
`;

const Th = styled.th`
  font-size: 14px;
  width: 3%;
  color: ${variables.black000};

  &:first-of-type {
    width: 90px;
    text-align: left;
  }
`;

export { TableElem, Th };
