import React from 'react';

import * as S from './Login.styled';
import { TipZipLogo } from '@components/Icons/TipZipLogo';

import KakaoIcon from '@assets/pngs/kakao-icon.png';
import NaverIcon from '@assets/pngs/naver-icon.png';
import GoogleIcon from '@assets/pngs/google-icon.png';

const Login: React.FC = () => {
  return (
    <S.Container>
      <S.Header>
        <TipZipLogo />
        <S.Tagline>나에게 필요한 모든 팁을 한번에 모아!</S.Tagline>
      </S.Header>
      <S.LoginSection>
        <S.KakaoButton>
          카카오로 로그인
          <S.SocialIcon src={KakaoIcon} />
        </S.KakaoButton>
        <S.NaverButton>
          네이버로 로그인
          <S.NaverIcon src={NaverIcon} />
        </S.NaverButton>
        <S.GoogleButton>
          구글로 로그인
          <S.SocialIcon src={GoogleIcon} />
        </S.GoogleButton>
      </S.LoginSection>
    </S.Container>
  );
};
export default Login;
