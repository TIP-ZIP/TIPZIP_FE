import styled from 'styled-components';
import leftArrow from '@assets/svgs/leftarrow.svg';

export const Header = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 1.4rem;
  margin-bottom: 2.2rem;
`;

export const BackButton = styled.button`
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1rem;
  background: url(${leftArrow}) center/contain no-repeat;
  border: none;
  cursor: pointer;
`;

export const Title = styled.h2`
  margin: 0 auto;
  ${({ theme }) => theme.fontStyles.Header2};
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.colors.TZ_Monochrome[1000]};
`;
