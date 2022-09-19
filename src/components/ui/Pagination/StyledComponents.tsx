import styled from 'styled-components';
import leftArrow from '@/image/left-arrow.svg';
import rightArrow from '@/image/right-arrow.svg';

const Next = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  background-image: url(${leftArrow});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 25px;
  height: 25px;

  transition: 0.3s opacity;

  &:hover {
    opacity: 0.6;
  }
}
`;

const Previous = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  background-image: url(${rightArrow});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 25px;
  height: 25px;
  margin-left: 10px;
  transition: 0.3s opacity;

  &:hover {
    opacity: 0.6;
  }
`;

export { Next, Previous };
