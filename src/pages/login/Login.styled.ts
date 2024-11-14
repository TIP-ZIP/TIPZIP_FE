import styled from 'styled-components';
import { colors } from '@styles/theme/colors';

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding-top: 10.5rem;
  padding-bottom: 2rem;
`;

export const Header = styled.div`
  width: 100%;
  padding-left: 32px;

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Tagline = styled.p`
  ${({ theme }) => theme.fontStyles.Body2}
  color: ${colors.TZ_Signature[500]};
`;

export const LoginSection = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
`;

export const SocialLoginButton = styled.button`
  width: 33.1rem;
  height: 5.2rem;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.fontStyles.Body3}
  color: ${colors.TZ_Monochrome[900]};
`;

export const KakaoButton = styled(SocialLoginButton)`
  position: relative;
  background-color: #ffe812;
`;

export const NaverButton = styled(SocialLoginButton)`
  position: relative;
  background-color: #00c73c;
`;

export const GoogleButton = styled(SocialLoginButton)`
  position: relative;
  background-color: #f3f4f8;
`;

export const SocialIcon = styled.img`
  width: 3.6rem;
  height: 3.6rem;

  position: absolute;
  top: 0.9rem;
  left: 1.6rem;
`;

export const NaverIcon = styled.img`
  width: 2.5rem;
  height: 2.5rem;

  transform: translateY(-50%);

  position: absolute;
  top: 50%;
  left: 2.1rem;
`;
