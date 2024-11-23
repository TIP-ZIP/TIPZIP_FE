import styled from 'styled-components';
import { colors } from '@styles/theme/colors';

export const Container = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;

  background-color: ${colors.TZ_Signature[500]};
`;

export const TagLine = styled.p`
  ${({ theme }) => theme.fontStyles.Body2}
  color: ${colors.TZ_Monochrome[0]};
`;
