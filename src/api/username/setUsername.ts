import axiosInstance from '@api/axios';

const setUsername = async (username: string): Promise<number> => {
  const response = await axiosInstance.post(
    '/auth/username',
    {
      username: username,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  console.log(response);

  return response.status;
};

export default setUsername;
