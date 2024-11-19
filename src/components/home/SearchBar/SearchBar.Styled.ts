import styled from 'styled-components';
import search from '@assets/svgs/Search.svg';

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  width: 33.5rem;
  height: 3.6rem;
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.TZ_Monochrome[100]};
`;

export const SearchIcon = styled.div`
  background: url(${search});
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
  font-size: 1rem;
  &::placeholder {
    color: ${({ theme }) => theme.colors.TZ_Monochrome[300]};
  }
  font-family: 'Pretendard';
`;
