import React from 'react';
import * as S from './PostList.Styled';
import { useLocation } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  image: string;
  profileName: string;
  bookmarks: number;
  isFilled: boolean;
}

interface PostListProps {
  posts: Post[];
  handleBookmarkClick: (postId: number) => void;
  $isMypage: boolean;
}

const PostList: React.FC<PostListProps> = ({ posts, handleBookmarkClick }) => {
  const location = useLocation();
  const isMypage = location.pathname === '/mypage';

  return (
    <S.PostList $isMypage={isMypage}>
      {posts.map((post) => (
        <S.PostItem key={post.id}>
          <S.PostImage $isMypage={isMypage}>
            <S.ProfileContainer>
              <S.ProfileImage />
              <S.ProfileName>{post.profileName}</S.ProfileName>
            </S.ProfileContainer>
            <S.BookmarkContainer>
              <S.BookmarkIcon
                $isFilled={post.isFilled}
                onClick={() => handleBookmarkClick(post.id)}
              />
              <S.BookmarkCount>{post.bookmarks}</S.BookmarkCount>
            </S.BookmarkContainer>
          </S.PostImage>
          <S.PostTitle $isMypage={isMypage}>{post.title}</S.PostTitle>
        </S.PostItem>
      ))}
    </S.PostList>
  );
};

export default PostList;
