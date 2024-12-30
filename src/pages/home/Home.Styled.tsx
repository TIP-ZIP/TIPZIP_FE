import styled from 'styled-components';
import { colors } from '@styles/theme/colors';

import star from '@assets/svgs/star.svg?react';
import whitestar from '@assets/svgs/whiteStar.svg?react';
import plus from '@assets/svgs/PlusPost.svg?react';
import orangebubble from '@assets/svgs/orange-bubble.svg?react';
import edit from '@assets/svgs/WhiteEdit.svg?react';

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
  /* padding: 0 2rem; */
`;

export const PostInfoBar = styled.div<{ $isSearchPage: boolean }>`
  display: flex;
  width: 100%;
  max-width: 33.1rem;
  justify-content: space-between;
  margin-top: ${({ $isSearchPage }) => ($isSearchPage ? '2rem' : '4.2rem')};
  width: 100%;
  position: absolute;
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
  ${({ theme }) => theme.fontStyles.Caption4}
  color: ${({ $selectedVerify, theme }) =>
    $selectedVerify ? theme.colors.TZ_Monochrome[0] : theme.colors.TZ_Monochrome[300]};
  font-size: 0.8rem;
`;

export const PlusBtn = styled(plus)<{ $isClicked: boolean }>`
  width: 4rem;
  height: 4rem;

  position: fixed;
  right: 2rem;
  bottom: 1.8rem;

  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;

  circle {
    fill: ${({ $isClicked }) =>
      $isClicked ? colors.TZ_Signature[500] : colors.TZ_Monochrome[1000]};
  }
`;

export const OrangeBubble = styled(orangebubble)`
  width: 12rem;
  height: 4.4rem;

  display: flex;
  align-items: center;
  gap: 0.8rem;

  position: fixed;
  bottom: 5.5rem;
  right: 2rem;
  z-index: 100;

  cursor: pointer;
`;

export const BubbleText = styled.span`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.TZ_Monochrome[0]};
  ${({ theme }) => theme.fontStyles.Caption1}
  height: 1.7rem;
`;

export const WhiteEdit = styled(edit)`
  width: 1.6rem;
  height: 1.6rem;
`;

export const NoResultsText = styled.div`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.colors.TZ_Monochrome[1000]};
  ${({ theme }) => theme.fontStyles.Body5}
  text-align: center;
  margin-top: 14.4rem;
`;
