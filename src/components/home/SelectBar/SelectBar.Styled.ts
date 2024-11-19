import styled, { css } from 'styled-components';
import { fontStyles } from '@styles/theme/typography';

interface SelectItemProps {
  $selected?: boolean;
}

export const SelectBar = styled.div`
  display: flex;
  justify-self: start;
  width: 100%;
  margin: 1.6rem 0;
  display: flex;
  gap: 1.6rem;
`;

export const SelectItem = styled.span<SelectItemProps>`
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.TZ_Signature[500] : theme.colors.TZ_Monochrome[1000]};
  ${fontStyles.Body3}
  line-height: 1.56rem;
  cursor: pointer;
  position: relative;
  padding-bottom: 0.6rem;

  ${({ $selected }) =>
    $selected &&
    css`
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.12rem;
        background-color: ${({ theme }) => theme.colors.TZ_Signature[500]};
        margin-top: 0.6rem;
      }
    `}
`;
