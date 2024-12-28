import axiosInstance from '@api/axios';

const checkDuplicate = async (username: string): Promise<void> => {
  try {
    const response = await axiosInstance.get(`/auth/username/exists?username=${username}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 추후 API 연동 시 Axios Instance 변경 및 Response 형식 반영
    switch (response.status) {
      case 200:
        alert('중복 검사 완료!');
        break;
      case 400:
        alert('사용중인 닉네임입니다.');
        break;
      case 500:
        console.warn('Internal Server Error');
        break;
      default:
        console.warn('Unknow Error');
    }
  } catch (error) {
    console.error('사용자명 중복 확인 오류: ', error);
    throw new Error('사용자명 중복 확인 오류가 발생했습니다.');
  }
};

export default checkDuplicate;
