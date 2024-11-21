import React from 'react';
import { useLocation } from 'react-router-dom';
import PostList from '@components/home/PostList/PostList';
import * as S from './PostSection.Styled';

interface PostSectionProps {
  posts: any[];
  handleBookmarkClick: (postId: number) => void;
}

const PostSection: React.FC<PostSectionProps> = ({ posts, handleBookmarkClick }) => {
  const location = useLocation();

  return (
    <S.PostSection>
      <S.PostInfo>
        <S.PostText>게시물</S.PostText>
        <S.PostCount>6개</S.PostCount>
      </S.PostInfo>
      <PostList
        posts={posts}
        handleBookmarkClick={handleBookmarkClick}
        $isMypage={location.pathname === '/mypage'}
      />
    </S.PostSection>
  );
};

export default PostSection;
