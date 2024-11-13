import styled from 'styled-components';
import { colors } from '@styles/theme/colors';

import MainLogo from '@assets/svgs/TipZipLogo.svg?react';

export const TipZipLogo = styled(MainLogo)`
  width: 18.8rem;
  height: 4.4rem;
  fill: ${({ color }) => color || `${colors.TZ_Signature[500]}`};
`;
