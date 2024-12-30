import styled from 'styled-components';
import search from '@assets/svgs/Search.svg?react';
import arrowLeft from '@assets/svgs/ArrowLeft.svg?react';
import { fontStyles } from '@styles/theme/typography';
import whitesearch from '@assets/svgs/whiteSearch.svg?react';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1.2rem;
  margin-bottom: 1.4rem;
  box-sizing: border-box;
  width: 100%;
  height: 4.4rem;
  gap: 0.8rem;
`;

export const BackBtn = styled(arrowLeft)`
  width: 1.4rem;
  height: 1.4rem;
  transform: scale(1.5);
  cursor: pointer;
`;

export const SearchBar = styled.div<{ $isFocused: boolean }>`
  display: flex;
  box-sizing: border-box;
  padding-left: 1.6rem;
  padding-top: 1.3rem;
  padding-bottom: 1.3rem;
  box-sizing: border-box;
  width: 30.7rem;
  height: 4.4rem;
  border-radius: 1rem;
  background-color: ${({ $isFocused }) => ($isFocused ? '#FDF9F4' : '#f1f1f1')};
`;

export const SearchIcon = styled(search)`
  width: 1.4rem;
  height: 1.4rem;
  margin-top: 0.2rem;
  margin-right: 1.6rem;
  cursor: pointer;
`;

export const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  &::placeholder {
    color: ${({ theme }) => theme.colors.TZ_Monochrome[300]};
    ${fontStyles.Body5}
  }
  font-family: 'Pretendard';
  ${fontStyles.Body3}
`;

export const SelectBar = styled.div`
  display: flex;
  justify-self: start;
  width: 100%;
  margin: 1.6rem 0;
  display: flex;
  gap: 1.6rem;
`;

export const TagOption = styled.div<{ $active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11.9rem;
  height: 3.1rem;
  gap: 0.2rem;
  padding: 1rem 1.2rem;
  cursor: ${({ $active }) => ($active ? 'pointer' : 'default')};
  box-sizing: border-box;
  margin-bottom: 0.6rem;
  border-radius: 30px;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.TZ_Signature[500] : theme.colors.TZ_Monochrome[300]};
  opacity: ${({ $active }) => ($active ? '1' : '0.5')};
  pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};
  transition:
    background-color 0.2s ease,
    opacity 0.2s ease;
`;

export const TagOptionText = styled.span<{ $active?: boolean }>`
  color: ${({ theme }) => theme.colors.TZ_Monochrome[0]};
  ${({ theme }) => theme.fontStyles.Caption3};
  transition: color 0.2s ease;
`;

export const WhiteSearchIcon = styled(whitesearch)`
  width: 0.7rem;
  margin-top: 0.1rem;
  height: 0.7rem;
  transform: scale(1.1);
`;

export const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  justify-content: center;
  margin-bottom: 9.8rem;
`;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const CategoryTitle = styled.h3`
  ${({ theme }) => theme.fontStyles.Body4};
  color: ${({ theme }) => theme.colors.TZ_Monochrome[1000]};
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  width: 33.1rem;
`;

export const TagItem = styled.div<{ $active?: boolean }>`
  padding: 0.8rem 1rem;
  border-radius: 4px;
  border: ${({ $active }) => ($active ? '0.06rem' : '0.04rem')} solid
    ${({ theme, $active }) =>
      $active ? theme.colors.TZ_Signature[500] : theme.colors.TZ_Monochrome[300]};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.TZ_Signature[500] : theme.colors.TZ_Monochrome[300]};
  ${({ theme }) => theme.fontStyles.Caption8};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border: 0.08rem solid ${({ theme }) => theme.colors.TZ_Signature[500]};
    color: ${({ theme }) => theme.colors.TZ_Signature[500]};
  }
`;
