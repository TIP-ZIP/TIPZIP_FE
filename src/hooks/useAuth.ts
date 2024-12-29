import axiosInstance from '@api/axios';
import { useState, useCallback } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const validateToken = (): boolean => {
    const accessToken = localStorage.getItem('accessToken');
    const isValid = !!accessToken;
    setIsAuthenticated(isValid);
    return isValid;
  };

  const logout = useCallback(async (): Promise<void> => {
    try {
      // DB 내 Refresh Token 삭제
      await axiosInstance.post('/auth/logout');

      // 로컬 스토리지 내 모든 데이터 삭제
      localStorage.clear();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed: ', error);
    }
  }, []);

  return { isAuthenticated, validateToken, logout };
};

export default useAuth;
