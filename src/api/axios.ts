import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 요청 인터셉터 (Request Interceptor)
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    // 토큰이 존재하면 토큰을 Authorization 헤더에 추가
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // 에러 발생 시 상위 코드에서 에러 처리
  },
);

// Response Interceptors
axiosInstance.interceptors.response.use(
  (response) => response, //  axios 요청 성공 시
  async (error) => {
    // axios 요청에 사용된 config object (URL, headers, body 포함)
    const originalRequest = error.config;

    // !originalRequest._retry는 요청 실패 시, 최초 한번만 재시도하도록 제어하는 역할
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Access Token 재발급 요청
        const { data } = await axiosInstance.post('/auth/token_reissue');

        const accessToken = data.access_token;
        console.log('New Access Token', accessToken);

        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);

          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch {
        // Access Token 재발급 실패 시
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        console.error('Access Token reissue failed: ', error);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
