import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './Mypage.Styled';
import ProfileSection from '@components/mypage/ProfileSection/ProfileSection';
import PostSection from '@components/mypage/PostSection/PostSection';
import EditorSection from '@components/mypage/EditorSection/EditorSection';
import axiosInstance from '@api/axios';

const Mypage: React.FC = () => {
  const { writerid } = useParams<{ writerid: string }>();
  const [posts, setPosts] = useState<any[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editorType, setEditorType] = useState<'username' | 'introduction'>('username');
  const [username, setusername] = useState('');
  const [message, setMessage] = useState('');

  // writerid가 없으면 로컬스토리지에서 userId를 가져옴
  const userId = writerid || '';
  const isOwnProfile = !writerid;
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

  // 포스트 데이터 불러오기
  useEffect(() => {
    if (userId) {
      // Check if writerid exists, if not, make a request to /posts/my
      const endpoint = writerid ? `/posts/user/${userId}` : '/posts/my';

      // Set token in the request headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axiosInstance
        .get(endpoint, config)
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          console.error('포스트 데이터를 가져오는 중 오류 발생:', error);
        });
    }
  }, [userId, writerid]);

  // 북마크 클릭 핸들러
  const handleBookmarkClick = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isFilled: !post.scrap,
              scrapCount: post.scrap ? post.scrapCount - 1 : post.scrapCount + 1,
            }
          : post,
      ),
    );
  };

  // 닉네임 수정 에디터 열기
  const handleNameClick = () => {
    setShowEditor(true);
    setEditorType('username');
  };

  // 자기소개 수정 에디터 열기
  const handleIntroductionClick = () => {
    setShowEditor(true);
    setEditorType('introduction');
  };

  // EditorSection에서 업데이트된 값을 처리
  const handleUpdate = (updatedValue: { username?: string; message?: string }) => {
    if (updatedValue.username !== undefined) {
      setusername(updatedValue.username);
    }
    if (updatedValue.message !== undefined) {
      setMessage(updatedValue.message);
    }
  };

  // 에디터 닫기
  const closeEditor = () => {
    setShowEditor(false);
  };

  // 닉네임 입력 변경 핸들러
  const handleusernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setusername(e.target.value);
  };

  // 자기소개 입력 변경 핸들러
  const handleIntroductionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <S.Container>
      <S.Zip>
        <S.ZipShape>마이 페이지</S.ZipShape>
        <S.ZipLine />
      </S.Zip>
      <ProfileSection
        username={username}
        message={message}
        onNameClick={handleNameClick}
        onIntroductionClick={handleIntroductionClick}
        isOwnProfile={isOwnProfile}
      />
      <S.PostWrapper>
        <S.GrayLine />
        <PostSection posts={posts} handleBookmarkClick={handleBookmarkClick} />
        <S.Text>{username} 님만의 꿀팁을 공유해주세요!</S.Text>
        {showEditor && (
          <EditorSection
            showEditor={showEditor}
            editorType={editorType}
            username={username}
            message={message}
            handleusernameChange={handleusernameChange}
            handleIntroductionChange={handleIntroductionChange}
            closeEditor={closeEditor}
            onUpdate={handleUpdate}
          />
        )}
      </S.PostWrapper>
    </S.Container>
  );
};

export default Mypage;
