import styled from 'styled-components';
import { colors } from '@styles/theme/colors';

import MainLogo from '@assets/svgs/TipZipLogo.svg?react';

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;

  background-color: ${colors.TZ_Signature[500]};
`;

export const TipZipLogo = styled(MainLogo)`
  width: 188px;
  height: 44px;
  fill: ${({ color }) => color || `${colors.TZ_Signature[500]}`};
`;

export const TagLine = styled.p`
  ${({ theme }) => theme.fontStyles.Body2}
  color: ${colors.TZ_Monochrome[0]};
`;
