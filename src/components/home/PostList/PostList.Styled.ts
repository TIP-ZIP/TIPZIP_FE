import styled from 'styled-components';
import postImg from '@assets/svgs/postexample.svg';
import { fontStyles } from '@styles/theme/typography';
import plus from '@assets/svgs/plus.svg';
import filled from '@assets/svgs/FilledBookmark.svg';
import empty from '@assets/svgs/EmptyBookmark.svg';
import profileImg from '@assets/svgs/defaultProfile.svg';

export const PostList = styled.div<{ $isMypage?: boolean }>`
  display: flex;
  max-height: 100%;
  display: grid;
  position: ${({ $isMypage }) => ($isMypage ? 'relative' : 'absolute')};
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ $isMypage }) => ($isMypage ? '2rem 2.3rem' : '2.3rem 1.1rem')};
  margin-top: ${({ $isMypage }) => ($isMypage ? '0' : '8.4rem')};
  padding-bottom: ${({ $isMypage }) => ($isMypage ? '0' : '6.2rem')};
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

export const PostImage = styled.div<{ $isMypage?: boolean }>`
  width: ${({ $isMypage }) => ($isMypage ? '14.4rem' : '16rem')};
  height: ${({ $isMypage }) => ($isMypage ? '14.4rem' : '16rem')};
  border-radius: 0.6rem;
  background: url(${postImg});
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  object-fit: cover;
`;

export const PostTitle = styled.span<{ $isMypage?: boolean }>`
  width: 16rem;
  height: 3.6rem;
  ${fontStyles.Body5}
  font-weight: ${({ $isMypage }) => ($isMypage ? '500' : '400')};
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
