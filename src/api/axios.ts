import axios, { AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

let isTokenRefreshing = false; // 토큰 재발급 여부를 관리하는 전역 상태
let refreshSubscribers: ((token: string) => void)[] = []; // 재발급 완료 후 대기 중인 요청 처리

// 재발급된 토큰을 다른 요청에 전달
const onTokenRefreshed = (newToken: string) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = []; // 대기 목록 초기화
};

// 재발급 요청 중 다른 요청을 대기열에 추가
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// 요청 인터셉터 (Request Interceptor)
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    // 토큰이 존재하면 토큰을 Authorization 헤더에 추가
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // 에러 발생 시 상위 코드에서 에러 처리
  },
);

// Response Interceptors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response, //  axios 요청 성공 시
  async (error) => {
    // axios 요청에 사용된 config object (URL, headers, body 포함)
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      if (isTokenRefreshing) {
        // 토큰 재발급 중일 경우 대기
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      // 최초로 토큰 재발급 요청 실행
      originalRequest._retry = true;
      isTokenRefreshing = true;

      try {
        // Access Token 재발급 요청
        const { data } = await axiosInstance.post('/auth/token_reissue');
        console.log(data);

        const newAccessToken = data.access_token;
        console.log('New Access Token', newAccessToken);

        if (newAccessToken) {
          localStorage.setItem('accessToken', newAccessToken);

          // 대기 중인 요청들에 새 토큰 전달
          onTokenRefreshed(newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch {
        // Access Token 재발급 실패 시
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(error);
      } finally {
        isTokenRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
