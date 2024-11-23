import styled, { css } from 'styled-components';
import { colors } from '@styles/theme/colors';

import leftArrow from '@assets/svgs/ArrowLeft.svg?react';
import certificationBadge from '@assets/svgs/certificationBadge.svg?react';
import bookMark from '@assets/svgs/EmptyBlackBookmark.svg?react';
import linkIcon from '@assets/svgs/link.svg?react';

export const PostDetailWrapper = styled.div`
  width: 100%;
  padding-top: 6rem;
  padding-bottom: 3.6rem;
`;

// Post Detail Header
export const PostDetailHeader = styled.div`
  width: 100%;
  max-width: 768px;
  min-width: 375px;
  padding: 1.6rem;

  position: fixed;
  top: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${colors.TZ_Monochrome[0]};
`;

export const LeftArrow = styled(leftArrow)`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  left: 1.6rem;

  cursor: pointer;
`;

export const HeaderTitle = styled.h2`
  ${({ theme }) => theme.fontStyles.Header2}
  color: ${colors.TZ_Monochrome[1000]};
`;

// Main Section
export const PostDetailMain = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

// Introduction
export const PostIntroduction = styled.div`
  width: 100%;
  padding: 0 2.4rem;

  display: flex;
  flex-direction: column;
`;

export const PostInfosContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PostAuthorDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const ProfileImage = styled.img`
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 30px;
`;

export const NameBadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

export const AuthorName = styled.span`
  ${({ theme }) => theme.fontStyles.Caption10}
  color: ${colors.TZ_Monochrome[1000]};
`;

export const CertificationBadge = styled(certificationBadge)`
  width: 1.6rem;
  height: 1.6rem;
`;

export const PostDate = styled.span`
  ${({ theme }) => theme.fontStyles.Caption7}
  color: ${colors.TZ_Monochrome[500]};
`;

export const AuthorProfileButton = styled.button`
  padding: 0.6rem 1rem;
  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.fontStyles.Caption6}
  background-color: ${colors.TZ_Monochrome[100]};
  color: ${colors.TZ_Monochrome[500]};
`;

export const PostTitle = styled.h2`
  width: 100%;
  margin-top: 1.2rem;
  margin-bottom: 1rem;

  ${({ theme }) => theme.fontStyles.Body1}
  color: ${colors.TZ_Monochrome[1000]};
`;

export const PostCategory = styled.div`
  width: fit-content;
  padding: 0.6rem 0.8rem;
  border-radius: 4px;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.fontStyles.Caption4}
  background-color: ${colors.TZ_Monochrome[1000]};
  color: ${colors.TZ_Monochrome[0]};
`;

// Content Section
export const PostContentWrapper = styled.div`
  width: 100%;
  padding: 2rem 2.4rem;

  background-color: ${colors.TZ_Monochrome[50]};
`;

export const PostContentContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const TextContent = styled.div`
  ${({ theme }) => theme.fontStyles.Caption9}
  line-height: 170%;
`;

export const ImageContent = styled.img`
  width: 100%;
  height: auto;
`;

export const PostHastagContainer = styled.div`
  width: 100%;
  margin-top: 3.2rem;

  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

export const HashtagButton = styled.button`
  width: fit-content;
  padding: 0.8rem 1rem;
  border-radius: 4px;
  border: 0.6px solid ${colors.TZ_Signature[500]};

  ${({ theme }) => theme.fontStyles.Caption3}
  color: ${colors.TZ_Signature[500]};
`;

// Post Detail Footer
export const PostDetailFooter = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;
`;

export const BookmarkContainer = styled.div`
  width: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const BookmarkIcon = styled(bookMark)<{ $isScrapped: boolean | undefined }>`
  width: 2.2rem;
  height: 2.2rem;

  path {
    ${({ $isScrapped }) =>
      $isScrapped
        ? css`
            stroke-width: 0;
            fill: ${colors.TZ_Monochrome[1000]};
          `
        : css`
            stroke-width: 1.2;
            fill: transparent;
          `};

    transition:
      stroke-width 0.1s ease-out,
      fill 0.15s ease-in;
  }

  cursor: pointer;
`;

export const ScrapCount = styled.span`
  ${({ theme }) => theme.fontStyles.Caption9}
  color: ${colors.TZ_Monochrome[1000]};
`;

export const PostLinkButton = styled.button`
  width: fit-content;
  padding: 0.8rem 1rem;
  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;

  ${({ theme }) => theme.fontStyles.Caption3}
  background-color: ${colors.TZ_Monochrome[1000]};
  color: ${colors.TZ_Monochrome[0]};
`;

export const LinkIcon = styled(linkIcon)`
  width: 1rem;
  height: 1rem;
`;
