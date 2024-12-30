import React from 'react';
import { useLocation } from 'react-router-dom';
import PostList from '@components/home/PostList/PostList';
import * as S from './PostSection.Styled';

interface PostSectionProps {
  posts: any[];
  handleBookmarkClick: (postId: number) => void;
  selectedCategory?: number[];
  sortOption?: string;
  selectedItem?: string;
  isVerify?: boolean;
  searchQuery?: string;
  selectedTags?: string[];
}

const PostSection: React.FC<PostSectionProps> = ({
  posts,
  handleBookmarkClick,
  selectedCategory = [],
  sortOption = '',
  selectedItem = '',
  isVerify = false,
  searchQuery = '',
  selectedTags = [],
}) => {
  const location = useLocation();

  // 마이페이지에서만 사용하는 props를 기본값을 넘겨줌
  return (
    <S.PostSection>
      <S.PostInfo>
        <S.PostText>게시물</S.PostText>
        <S.PostCount>{posts.length}개</S.PostCount>
      </S.PostInfo>
      <PostList
        posts={posts}
        $isMypage={location.pathname === '/mypage/'}
        selectedCategory={selectedCategory}
        sortOption={sortOption}
        selectedItem={selectedItem}
        isVerify={isVerify}
        searchQuery={searchQuery}
        selectedTags={selectedTags}
      />
    </S.PostSection>
  );
};

export default PostSection;
