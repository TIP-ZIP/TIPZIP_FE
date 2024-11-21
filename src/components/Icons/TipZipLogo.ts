import styled from 'styled-components';
import { colors } from '@styles/theme/colors';

import MainLogo from '@assets/svgs/TipZipLogo.svg?react';

interface TipZipLogoProps {
  color?: string;
  width?: string;
  height?: string;
}

export const TipZipLogo = styled(MainLogo)<TipZipLogoProps>`
  width: ${({ width }) => width || '18.8rem'};
  height: ${({ height }) => height || '4.4rem'};
  fill: ${({ color }) => color || `${colors.TZ_Signature[500]}`}; // 기본 색상
`;
