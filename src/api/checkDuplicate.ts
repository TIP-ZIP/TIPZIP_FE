import axios from 'axios';

const checkDuplicate = async (username: string): Promise<string | undefined> => {
  try {
    const response = await axios.post('auth/username-valid', {
      username: username,
    });

    // 추후 API 연동 시 Axios Instance 변경 및 Response 형식 반영
    if (response) alert('중복 검사 완료!');

    return response.data.message;
  } catch (error) {
    console.error('사용자명 중복 확인 오류: ', error);
  }
};

export default checkDuplicate;
