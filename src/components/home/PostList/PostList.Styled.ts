import styled from 'styled-components';
import postImg from '@assets/svgs/postexample.svg';
// 여기 디폴트 이미지 바꾸면 됨
import { fontStyles } from '@styles/theme/typography';
import plus from '@assets/svgs/plus.svg?react';
import filled from '@assets/svgs/FilledBookmark.svg?react';
import empty from '@assets/svgs/EmptyBookmark.svg?react';
import profileImg from '@assets/svgs/defaultProfile.svg?react';

export const PostList = styled.div<{ $isMypage?: boolean; $isSearchPage?: boolean }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.3rem 1.1rem;
  margin-top: ${({ $isMypage, $isSearchPage }) =>
    $isSearchPage ? '5.3rem' : $isMypage ? '0' : '9.8rem'};
  padding-bottom: ${({ $isMypage }) => ($isMypage ? '0' : '6.2rem')};
  @media (min-width: 768px) {
    ${({ $isMypage }) => $isMypage && `grid-template-columns: repeat(3, 1fr);`}
  }
`;

export const PostItem = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  cursor: pointer;
  gap: 0.8rem;
  overflow: hidden;
  text-align: left;
`;

export const Nocontent = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  ${fontStyles.Caption3}
`;

export const PostImage = styled.div<{ $imageUrl?: string; $isMypage?: boolean }>`
  width: 16rem;
  height: 16rem;
  border-radius: 0.6rem;
  background-image: url(${(props) => props.$imageUrl || postImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  object-fit: cover;

  @media (min-width: 768px) {
    ${({ $isMypage }) =>
      $isMypage &&
      `
      width: 13rem;
      height: 13rem;
    `}
  }
`;

export const PostTitle = styled.span<{ $isMypage?: boolean }>`
  width: 16rem;
  height: 3.6rem;
  ${fontStyles.Body5}
  font-weight: 400;
  @media (min-width: 768px) {
    ${({ $isMypage }) =>
      $isMypage &&
      `
      width: 13rem;
      font-size: 1rem;
    `}
  }
`;

export const Plus = styled(plus)`
  display: flex;
  position: fixed;
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

export const ProfileImage = styled(profileImg)<{ $imageUrl?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 30px;
  content: url(${(props) => props.$imageUrl || ''});
  background-size: cover;
  background-position: center;
`;

export const ProfileName = styled.span`
  ${fontStyles.Caption3}
  color: ${({ theme }) => theme.colors.TZ_Monochrome[0]};
`;

export const BookmarkContainer = styled.div`
  position: absolute;
  bottom: 0.8rem;
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
