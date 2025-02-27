import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { postAuthCodeToServer } from '@auth/utils/authHelpers';

import Spinner from '@components/postdetail/Spinner';

const NaverRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isFirstRender = useRef<boolean>(true);

  const queryParams = new URLSearchParams(location.search);
  const NAVER_AUTH_CODE = queryParams.get('code');

  useEffect(() => {
    if (!isFirstRender.current) return;
    isFirstRender.current = false;

    if (NAVER_AUTH_CODE) {
      console.log('Authorization Code: ', NAVER_AUTH_CODE);

      const handleAuth = async () => {
        try {
          const response = await postAuthCodeToServer('NAVER', NAVER_AUTH_CODE);
          console.log('Response: ', response);

          if (response?.status === 200 || response?.status === 201) {
            console.log('Naver Auth Success: ', response.data);

            // 로그인 성공 시 로컬 스토리지에 JWT 토큰 저장
            localStorage.setItem('accessToken', response.data.access_token);
            localStorage.setItem('userID', response.data.user_id);

            if (response.data.username) {
              localStorage.setItem('userName', response.data.username);
              navigate('/home');
            } else {
              navigate('/set-username');
            }
          } else {
            console.warn('Authorization Code POST fail');
            navigate('/login-error');
          }
        } catch (error) {
          console.error('Fetching access token failed: ', error);
        }
      };

      handleAuth();
    }
  }, [NAVER_AUTH_CODE, navigate]);

  return <Spinner />;
};

export default NaverRedirect;
