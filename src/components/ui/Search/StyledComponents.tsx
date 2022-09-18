import styled from 'styled-components';
import variables from '@/Variables.module.scss';

const Form = styled.form`
  font-family: inherit;
`;

const Input = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid ${variables.black000};
  transition: 0.3s border-color;
  padding-bottom: 4px;

  &::placeholder {
    color: ${variables.black100};
  }

  &:hover {
    border-color: ${variables.black100};
  }

  &:focus {
    border-color: ${variables.black100};
  }
`;

export { Form, Input };
