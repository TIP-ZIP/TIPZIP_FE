import styled, { css } from 'styled-components';

interface TagItemProps {
  $selectedtag?: boolean;
}


export const CategoryList = styled.div<{ $maxWidth?: string }>`
  display: flex;
  position: absolute;
  overflow-x: scroll;
  scroll-behavior: smooth;
  white-space: nowrap;
  gap: 0.8rem;
  max-width: ${props => props.$maxWidth || '100%'};
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const CategoryItem = styled.span<TagItemProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.8rem;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.TZ_Monochrome[100]};
  border-radius: 0.4rem;
  color: #cbd0d4;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.colors.TZ_Signature[500]};
    color: ${({ theme }) => theme.colors.TZ_Monochrome[0]};
  }

  ${({ $selectedtag, theme }) =>
    $selectedtag &&
    css`
      background-color: ${theme.colors.TZ_Signature[500]};
      color: ${theme.colors.TZ_Monochrome[0]};
    `}
`;
