import styled from 'styled-components';

interface ContainerProps {
  $shouldHideHeader: boolean;
}

export const Container = styled.div<ContainerProps>`
  min-width: 375px;
  max-width: 768px;
  min-height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
  padding-top: ${(props) => (props.$shouldHideHeader ? '0rem' : '5.1rem')};
`;
