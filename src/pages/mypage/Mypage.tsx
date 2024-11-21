import React, { useState } from 'react';
import * as S from './Mypage.Styled';
import { postsData } from '@constants/PostData';
import ProfileSection from '@components/mypage/ProfileSection/ProfileSection';
import PostSection from '@components/mypage/PostSection/PostSection';
import EditorSection from '@components/mypage/EditorSection/EditorSection';

const Mypage: React.FC = () => {
  const [posts, setPosts] = useState(postsData);
  const [showEditor, setShowEditor] = useState(false);
  const [editorType, setEditorType] = useState<'nickname' | 'introduction'>('nickname');
  const [nickname, setNickname] = useState('아기 사자 🦁');
  const [introduction, setIntroduction] = useState('');

  const handleBookmarkClick = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isFilled: !post.isFilled,
              bookmarks: post.isFilled ? post.bookmarks - 1 : post.bookmarks + 1,
            }
          : post,
      ),
    );
  };
  const handleNameClick = () => {
    setShowEditor((prev) => !prev);
    setEditorType('nickname');
  };

  const handleIntroductionClick = () => {
    setShowEditor((prev) => !prev);
    setEditorType('introduction');
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleIntroductionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIntroduction(e.target.value);
  };

  const closeEditor = () => {
    setShowEditor(false);
  };

  return (
    <S.Container>
      <S.Zip>
        <S.ZipShape>마이 페이지</S.ZipShape>
        <S.ZipLine />
      </S.Zip>
      <ProfileSection
        nickname={nickname}
        introduction={introduction}
        onNameClick={handleNameClick}
        onIntroductionClick={handleIntroductionClick}
        isOwnProfile={false}
      />
      <S.GrayLine />
      <PostSection posts={posts} handleBookmarkClick={handleBookmarkClick} />
      <S.Text>{nickname} 님만의 꿀팁을 공유해주세요!</S.Text>
      <EditorSection
        showEditor={showEditor}
        editorType={editorType}
        nickname={nickname}
        introduction={introduction}
        handleNicknameChange={handleNicknameChange}
        handleIntroductionChange={handleIntroductionChange}
        closeEditor={closeEditor}
      />
    </S.Container>
  );
};
export default Mypage;
