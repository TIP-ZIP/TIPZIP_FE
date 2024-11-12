import React from 'react';
import * as S from '@pages/home/Home.Styled';

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
}

const PostList: React.FC<PostListProps> = ({ posts, handleBookmarkClick }) => {
  return (
    <S.PostList>
      {posts.map((post) => (
        <S.PostItem key={post.id}>
          <S.PostImage>
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
          <S.PostTitle>{post.title}</S.PostTitle>
        </S.PostItem>
      ))}
    </S.PostList>
  );
};

export default PostList;
