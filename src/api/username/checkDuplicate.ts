import axiosInstance from '@api/axios';

const checkDuplicate = async (username: string): Promise<number> => {
  try {
    const response = await axiosInstance.get(`/auth/username/exists?username=${username}`);

    // 추후 API 연동 시 Axios Instance 변경 및 Response 형식 반영
    switch (response.status) {
      case 200:
        alert('중복 검사 완료!');
        return response.status;
      case 400:
        alert('사용중인 닉네임입니다.');
        return response.status;
      case 500:
        console.warn('Internal Server Error');
        return response.status;
      default:
        console.warn('Unknown Error');
        return response.status;
    }
  } catch (error) {
    console.error('사용자명 중복 확인 오류: ', error);
    throw new Error('사용자명 중복 확인 오류가 발생했습니다.');
  }
};

export default checkDuplicate;
