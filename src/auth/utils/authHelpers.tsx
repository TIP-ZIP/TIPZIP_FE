import axios from 'axios';

export const postAuthCodeToServer = async (socialProvider: string, code: string) => {
  const response = await axios.post(
    `http://13.125.173.168:8080/auth/login`,
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
  console.log('Kakao Auth Success: ', response.data);
  // return response.data;

  localStorage.setItem('kakaoToken', response.data.access_token);
};
