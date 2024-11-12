import styled, { css } from 'styled-components';
import search from '@assets/svgs/Search.svg';
import ArrowDown from '@assets/svgs/ArrowDown.svg';
import star from '@assets/svgs/star.svg';
import whitestar from '@assets/svgs/whiteStar.svg';
import postImg from '@assets/svgs/postexample.svg';
import { fontStyles } from '@styles/theme/typography';
import plus from '@assets/svgs/plus.svg';
import filled from '@assets/svgs/FilledBookmark.svg';
import empty from '@assets/svgs/EmptyBookmark.svg';
import profileImg from '@assets/svgs/defaultProfile.svg';

interface SelectItemProps {
  $selected?: boolean;
}

interface TagItemProps {
  $selectedtag?: boolean;
}

export const HomeLayout = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.TZ_Monochrome[0]};
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
`;

export const Container = styled.div`
  padding: 0 2rem;
`;

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

export const CategoryList = styled.div`
  display: flex;
  position: absolute;
  overflow-x: scroll;
  scroll-behavior: smooth;
  white-space: nowrap;
  gap: 0.8rem;
  max-width: calc(100% - 4rem);
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

export const PostInfoBar = styled.div`
  display: flex;
  width: 100%;
  max-width: 33.1rem;
  justify-content: space-between;
  margin-top: 4.2rem;
  width: 100%;
  position: absolute;
`;

export const DropdownContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 6.7rem;
`;

export const DropdownButton = styled.button`
  padding: 0.4rem;
  border-radius: 0.4rem;
  gap: 0.4rem;
  background-color: ${({ theme }) => theme.colors.TZ_Monochrome[0]};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.TZ_Monochrome[600]};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.TZ_Signature[500]};
  }

  span {
    margin-left: auto;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.TZ_Monochrome[500]};
  }
`;

export const Arrow = styled.div<{ $isOpen: boolean }>`
  background: url(${ArrowDown});
  background-repeat: no-repeat;
  background-size: contain;
  width: 1rem;
  height: 0.6rem;
  ${({ $isOpen }) =>
    $isOpen &&
    `
      transform: rotate(180deg);
    `}
`;

export const DropdownList = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
  top: 100%;
  background-color: ${({ theme }) => theme.colors.TZ_Monochrome[0]};
  left: 0;
  right: 0;
  border: none;
  border-radius: 0.4rem;
  list-style-type: none;
  margin: 0;
  padding: 0;
  z-index: 2;
  padding: 0.45rem;
  overflow-x: hidden;
`;

export const DropdownItem = styled.li<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  border-radius: 0.2rem;
  width: 5.8rem;
  height: 1.8rem;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.TZ_Monochrome[600]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.TZ_Signature[500]};
    color: ${({ theme }) => theme.colors.TZ_Monochrome[0]};
  }

  ${({ selected, theme }) =>
    selected &&
    `
    background-color:#FFEDE9;
    color: ${theme.colors.TZ_Signature[500]};
  `}
`;

export const SelectVerify = styled.div<{ $selectedVerify: boolean }>`
  display: flex;
  padding: 0.6rem 0.8rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 0.3rem;
  border-radius: 2rem;
  width: 9.1rem;
  background-color: ${({ $selectedVerify, theme }) =>
    $selectedVerify ? theme.colors.TZ_Signature[500] : theme.colors.TZ_Monochrome[100]};
`;

export const Star = styled.div<{ $selectedVerify: boolean }>`
  background: ${({ $selectedVerify }) => `url(${$selectedVerify ? whitestar : star})`};
  width: 1.2rem;
  height: 1.2rem;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const VerifyText = styled.div<{ $selectedVerify: boolean }>`
  ${fontStyles.Caption4}
  color: ${({ $selectedVerify, theme }) =>
    $selectedVerify ? theme.colors.TZ_Monochrome[0] : theme.colors.TZ_Monochrome[300]};

  font-size: 0.8rem;
`;

export const PostList = styled.div`
  display: flex;
  max-height: 100%;
  display: grid;
  position: absolute;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.3rem 1.1rem;
  margin-top: 8.4rem;
  padding-bottom: 6.2rem;
`;

export const PostItem = styled.div`
  width: 16rem;
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 0.8rem;
  overflow: hidden;
  text-align: left;
`;

export const PostImage = styled.div`
  width: 16rem;
  height: 16rem;
  border-radius: 0.6rem;
  background: url(${postImg});
  background-size: cover;
  background-repeat: no-repeat;
  object-fit: cover;
`;

export const PostTitle = styled.span`
  width: 100%;
  height: 3.6rem;
  ${fontStyles.Body5}
`;

export const Plus = styled.div`
  display: flex;
  position: fixed;
  background: url(${plus});
  background-repeat: no-repeat;
  background-size: contain;
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  bottom: 1.8rem;
  z-index: 1000;
  right: 2rem;
`;

export const ProfileContainer = styled.div`
  position: absolute;
  top: 0.8rem;
  left: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 1.8rem;
  width: auto;
  z-index: 1;
`;

export const ProfileImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.8rem;
  height: 1.8rem;
  background-image: url(${profileImg});
  background-repeat: no-repeat;
  background-size: contain;
`;

export const ProfileName = styled.span`
  ${fontStyles.Caption3}
  color: ${({ theme }) => theme.colors.TZ_Monochrome[0]};
`;

export const BookmarkContainer = styled.div`
  position: absolute;
  bottom: 5.2rem;
  right: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  z-index: 1;
`;

export const BookmarkIcon = styled.div<{ $isFilled: boolean }>`
  width: 1.03rem;
  height: 1.28rem;
  background-image: ${({ $isFilled }) => `url(${$isFilled ? filled : empty})`};
  background-size: contain;
  cursor: pointer;
  background-repeat: no-repeat;
  transform: scale(1.1);
`;

export const BookmarkCount = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 400;
  height: 1rem;
  color: #fff;
`;
