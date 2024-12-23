import axiosInstance from '@api/axios';

export const postAuthCodeToServer = async (socialProvider: string, code: string) => {
  try {
    const response = await axiosInstance.post(
      '/auth/login',
      {
        social_provider: socialProvider,
        authorization_code: code,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return { status: response.status, data: response.data };
  } catch (error) {
    console.error('Kakao Auth Error:', error);
  }
};
