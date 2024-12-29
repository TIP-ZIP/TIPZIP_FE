import axiosInstance from '@api/axios';
import { useState, useCallback, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const validateToken = useCallback((): boolean => {
    const accessToken = localStorage.getItem('accessToken');
    const isValid = !!accessToken;
    setIsAuthenticated(isValid);
    return isValid;
  }, []);

  useEffect(() => {
    console.log('useAuth - 토큰 검증 실행');
    validateToken();
  }, [validateToken]);

  const logout = useCallback(async (): Promise<void> => {
    try {
      // DB 내 Refresh Token 삭제
      const response = await axiosInstance.post('/auth/logout');

      if (response.status === 200) {
        console.log('Refresh Token removed: ', response);
      }

      // 로컬 스토리지 내 모든 데이터 삭제
      localStorage.clear();

      // isAuthenticated 로그인 관리 State 업데이트
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed: ', error);
    }
  }, []);

  return { isAuthenticated, validateToken, logout };
};

export default useAuth;
