import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { postAuthCodeToServer } from '@auth/utils/authHelpers';

const KakaoRedirect = () => {
  const location = useLocation();
  const isFirstRender = useRef(true);

  const navigate = useNavigate();

  const KAKAO_AUTH_CODE = new URLSearchParams(location.search).get('code');
  console.log(KAKAO_AUTH_CODE);

  useEffect(() => {
    if (!isFirstRender.current) return;
    isFirstRender.current = false;

    if (KAKAO_AUTH_CODE) {
      try {
        postAuthCodeToServer('KAKAO', KAKAO_AUTH_CODE);
        navigate('/set-username');
      } catch (error) {
        console.error('Kakao Auth Error: ', error);
        // // 에러 처리 페이지로 라우팅
        // navigate('/login-error');
      }
    }
  }, [KAKAO_AUTH_CODE, navigate]);

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
};

export default KakaoRedirect;
