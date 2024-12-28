import React from 'react';

import * as S from './Login.styled';
import { TipZipLogo } from '@components/Icons/TipZipLogo';

import KakaoIcon from '@assets/pngs/kakao-icon.png';
import NaverIcon from '@assets/svgs/naver-icon.svg';
import GoogleIcon from '@assets/pngs/google-icon.png';

const Login: React.FC = () => {
  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
  const NAVER_REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI;
  const NAVER_STATE_STRING = 'test';

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;

  const GoogleAuthBaseURL = 'https://accounts.google.com/o/oauth2/v2/auth';
  const GOOGLE_AUTH_URL = `${GoogleAuthBaseURL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20profile%20email`;

  const NaverAuthBaseURL = 'https://nid.naver.com/oauth2.0/authorize';
  const NAVER_AUTH_URL = `${NaverAuthBaseURL}?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${NAVER_STATE_STRING}&redirect_uri=${NAVER_REDIRECT_URI}`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  const handleNaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return (
    <S.Container>
      <S.Header>
        <TipZipLogo />
        <S.Tagline>나에게 필요한 모든 팁을 한번에 모아!</S.Tagline>
      </S.Header>
      <S.LoginSection>
        <S.KakaoButton onClick={handleKakaoLogin}>
          카카오로 로그인
          <S.SocialIcon src={KakaoIcon} />
        </S.KakaoButton>
        <S.NaverButton onClick={handleNaverLogin}>
          네이버로 로그인
          <S.NaverIcon src={NaverIcon} />
        </S.NaverButton>
        <S.GoogleButton onClick={handleGoogleLogin}>
          구글로 로그인
          <S.SocialIcon src={GoogleIcon} />
        </S.GoogleButton>
      </S.LoginSection>
    </S.Container>
  );
};

export default Login;
