import styled from 'styled-components';
import { colors } from '@styles/theme/colors';

import MainLogo from '@assets/svgs/TipZipLogo.svg?react';

export const TipZipLogo = styled(MainLogo)`
  width: 188px;
  height: 44px;
  fill: ${({ color }) => color || `${colors.TZ_Signature[500]}`};
`;
