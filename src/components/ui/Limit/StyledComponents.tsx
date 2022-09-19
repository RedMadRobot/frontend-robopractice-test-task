import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  gap: 6px;
`;

const Select = styled.select`
  cursor: pointer;
  transition: 0.3s opacity;

  &:hover {
    opacity: 0.6;
  }
`;

const Text = styled.p`
  margin: 0;
`;

export { Form, Select, Text };
