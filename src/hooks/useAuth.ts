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

  const logout = useCallback(async (): Promise<number | undefined> => {
    try {
      const response = await axiosInstance.post('/auth/logout');

      if (response.status === 200) {
        console.log('Refresh Token removed: ', response);
      }

      localStorage.clear();
      setIsAuthenticated(false);

      return response.status;
    } catch (error) {
      console.error('Logout failed: ', error);
    }
  }, []);

  return { isAuthenticated, validateToken, logout };
};

export default useAuth;
