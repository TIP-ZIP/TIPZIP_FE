import styled from 'styled-components';
import search from '@assets/svgs/Search.svg';
import arrowLeft from '@assets/svgs/ArrowLeft.svg';
import { fontStyles } from '@styles/theme/typography';

export const Container = styled.div`
  display: flex;
  justify-content: center;
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

export const BackBtn = styled.div`
  background: url(${arrowLeft});
  background-repeat: no-repeat;
  background-size: contain;
  width: 1.4rem;
  height: 1.4rem;
  transform: scale(1.5);
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

export const SearchIcon = styled.div`
  background: url(${search});
  width: 1.4rem;
  height: 1.4rem;
  margin-right: 1.6rem;
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
