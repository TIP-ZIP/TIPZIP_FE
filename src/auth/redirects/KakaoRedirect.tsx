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
      const handleAuth = async () => {
        try {
          const response = await postAuthCodeToServer('KAKAO', KAKAO_AUTH_CODE);
          console.log('Response: ', response);

          if (response?.status === 200 || response?.status === 201) {
            console.log('Kakao Auth Success: ', response.data);
            // 로그인 성공 시 로컬 스토리지에 JWT 토큰 저장
            localStorage.setItem('kakaoToken', response.data.access_token);
          } else if (response?.status === 401) {
            console.warn('Authorization Code POST fail');
          }

          if (response?.status === 200 && response.data.username) {
            navigate('/home');
          } else {
            navigate('/set-username');
          }
        } catch (error) {
          console.error('Unknown Kakao Auth Error: ', error);
          // // 에러 처리 페이지로 라우팅
          // navigate('/login-error');
        }
      };

      handleAuth();
    }
  }, [KAKAO_AUTH_CODE, navigate]);

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
};

export default KakaoRedirect;
