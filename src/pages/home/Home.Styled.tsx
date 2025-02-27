import styled from 'styled-components';
import star from '@assets/svgs/star.svg';
import whitestar from '@assets/svgs/whiteStar.svg';
import plus from '@assets/svgs/PlusPost.svg';
import orangeplus from '@assets/svgs/OrangePlusPost.svg';
import orangebubble from '@assets/svgs/orangebubble.svg';
import edit from '@assets/svgs/WhiteEdit.svg';

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

export const PlusBtn = styled.div<{ $isClicked: boolean }>`
  position: fixed;
  bottom: 1.8rem;
  right: 2rem;
  background: url(${(props) => (props.$isClicked ? orangeplus : plus)});
  background-repeat: no-repeat;
  background-size: contain;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
`;

export const OrangeBubble = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0.8rem;
  position: fixed;
  bottom: 5.5rem;
  right: 2rem;
  background: url(${orangebubble});
  background-repeat: no-repeat;
  background-size: contain;
  width: 12rem;
  height: 4.4rem;
  padding-top: 0.8rem;
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

export const WhiteEdit = styled.div`
  background: url(${edit});
  background-repeat: no-repeat;
  background-size: contain;
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
