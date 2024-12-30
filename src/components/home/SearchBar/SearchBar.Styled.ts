import styled from 'styled-components';
import search from '@assets/svgs/Search.svg?react';

export const SearchBar = styled.div<{ $hasTags: boolean }>`
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 0 1rem;
  width: 33.5rem;
  height: 3.6rem;
  border-radius: 0.8rem;
  background-color: ${({ $hasTags, theme }) =>
    $hasTags ? 'transparent' : theme.colors.TZ_Monochrome[100]};
`;

export const SearchIcon = styled(search)`
  width: 1.4rem;
  height: 1.4rem;
  margin-right: 1.2rem;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

export const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  ${({ theme }) => theme.fontStyles.Body3};
  &::placeholder {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.TZ_Monochrome[300]};
  }
  font-family: 'Pretendard';
`;

export const Tags = styled.div`
  display: flex;
  width: 29rem;
  flex-wrap: nowrap;
  gap: 0.6rem;
  overflow-x: auto;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none; /* 스크롤바를 숨깁니다 */
  }
`;

export const Tag = styled.div`
  padding: 0.8rem 1.2rem;
  border-radius: 4px;
  border: 0.08rem solid ${({ theme }) => theme.colors.TZ_Signature[500]};
  color: ${({ theme }) => theme.colors.TZ_Signature[500]};
  ${({ theme }) => theme.fontStyles.Body4};
  cursor: pointer;
  transition: all 0.2s ease;
`;
