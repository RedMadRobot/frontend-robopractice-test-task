import styled from 'styled-components';
import variables from '@/Variables.module.scss';

const Wrapper = styled.div`
  box-sizing: border-box;
  font-family: ${variables.fontFamily};
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  min-height: 100vh;
  margin: 40px 0;
`;

const Inner = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
  margin-top: 40px;
`;

const Text = styled.p`
  margin: 0;
`;

export { Wrapper, Inner, Text };
