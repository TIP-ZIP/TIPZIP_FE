import styled from 'styled-components';

export const Container = styled.div<{ $noPadding: boolean }>`
  min-width: 375px;
  max-width: 768px;
  min-height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
  padding-top: ${({ $noPadding }) => ($noPadding ? '0' : '5.6rem')};
  clip-path: inset(0 0 0 0);
`;
