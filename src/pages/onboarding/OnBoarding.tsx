import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './OnBoarding.styled';
import { TipZipLogo } from '@components/Icons/TipZipLogo';

const OnBoarding: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 온보딩 Timer
    const timer = setTimeout(() => {
      navigate('/home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <S.Container>
      <TipZipLogo color='white' />
      <S.TagLine>나에게 필요한 모든 팁을 한번에 모아!</S.TagLine>
    </S.Container>
  );
};
export default OnBoarding;
