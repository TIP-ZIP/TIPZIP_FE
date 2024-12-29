import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './MyPage.Styled';
import ProfileSection from '@components/mypage/ProfileSection/ProfileSection';
import PostSection from '@components/mypage/PostSection/PostSection';
import EditorSection from '@components/mypage/EditorSection/EditorSection';
import axiosInstance from '@api/axios';

const MyPage: React.FC = () => {
  const { writerid } = useParams<{ writerid: string }>();
  const [posts, setPosts] = useState<any[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editorType, setEditorType] = useState<'username' | 'message'>('username');
  const [profileData, setProfileData] = useState<{ username: string; message: string }>({
    username: '',
    message: '',
  });

  const isOwnProfile = !writerid;
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const endpoint = writerid ? `/posts/user/${writerid}` : '/posts/my';

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
  }, [writerid, token]); // writerid, token이 변경될 때마다 실행됨

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

  const handleNameClick = () => {
    if (isOwnProfile) {
      setShowEditor(true);
      setEditorType('username');
    }
  };

  const handleIntroductionClick = () => {
    if (isOwnProfile) {
      setShowEditor(true);
      setEditorType('message');
    }
  };

  // EditorSection에서 업데이트된 값을 처리
  const handleUpdate = (updatedValue: { username?: string; message?: string }) => {
    setProfileData((prevData) => ({
      ...prevData,
      ...updatedValue,
    }));
    setShowEditor(false); // 에디터 닫기
  };

  const closeEditor = () => {
    setShowEditor(false);
  };

  useEffect(() => {
    const endpoint = isOwnProfile ? '/mypage/' : `/mypage/${writerid}`;
    axiosInstance
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { username, message } = response.data;
        setProfileData({ username, message });
      })
      .catch((error) => {
        console.error('프로필 데이터를 가져오는 중 오류 발생:', error);
      });
  }, [writerid, token, isOwnProfile]);

  return (
    <S.Container>
      <S.Zip>
        <S.ZipShape>마이 페이지</S.ZipShape>
        <S.ZipLine />
      </S.Zip>
      <ProfileSection
        username={profileData.username}
        message={profileData.message}
        onNameClick={handleNameClick}
        onIntroductionClick={handleIntroductionClick}
        isOwnProfile={isOwnProfile}
      />
      <S.PostWrapper>
        <S.GrayLine />
        <PostSection posts={posts} handleBookmarkClick={handleBookmarkClick} />
        <S.Text>{profileData.username} 님만의 꿀팁을 공유해주세요!</S.Text>
        {showEditor && (
          <EditorSection
            showEditor={showEditor}
            editorType={editorType}
            username={profileData.username}
            message={profileData.message}
            handleUsernameChange={(e) =>
              setProfileData({ ...profileData, username: e.target.value })
            }
            handleMessageChange={(e) => setProfileData({ ...profileData, message: e.target.value })}
            closeEditor={closeEditor}
            onUpdate={(updatedValue) => handleUpdate(updatedValue)}
          />
        )}
      </S.PostWrapper>
    </S.Container>
  );
};

export default MyPage;
