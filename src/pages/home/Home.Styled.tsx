import styled from 'styled-components';
import star from '@assets/svgs/star.svg';
import { fontStyles } from '@styles/theme/typography';
import whitestar from '@assets/svgs/whiteStar.svg';

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

export const PostInfoBar = styled.div`
  display: flex;
  width: 100%;
  max-width: 33.1rem;
  justify-content: space-between;
  margin-top: 4.2rem;
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
  ${fontStyles.Caption4}
  color: ${({ $selectedVerify, theme }) =>
    $selectedVerify ? theme.colors.TZ_Monochrome[0] : theme.colors.TZ_Monochrome[300]};
  font-size: 0.8rem;
`;
