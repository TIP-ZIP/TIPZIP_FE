import axiosInstance from '@api/axios';
import { useState, useCallback, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // 토큰 검증 함수
  const validateToken = useCallback((): boolean => {
    const accessToken = localStorage.getItem('accessToken');
    const isValid = !!accessToken;
    setIsAuthenticated(isValid);
    return isValid;
  }, []);

  // 컴포넌트 마운트 시 자동으로 토큰 검증
  useEffect(() => {
    console.log('useAuth - 토큰 검증 실행');
    validateToken();
  }, [validateToken]);

  const logout = useCallback(async (): Promise<void> => {
    try {
      const response = await axiosInstance.post('/auth/logout');

      if (response.status === 200) {
        console.log('Refresh Token removed: ', response);
      }

      localStorage.clear();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed: ', error);
    }
  }, []);

  return { isAuthenticated, validateToken, logout };
};

export default useAuth;
