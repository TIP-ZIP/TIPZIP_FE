import React, { useState, useEffect } from 'react';
import * as S from './PostList.Styled';
import { useLocation, useNavigate } from 'react-router-dom';
import ScrapEditorSection from '@components/postdetail/ScrapEditorSection';
import { axiosInstance } from '@api/axios';

interface Post {
  id: number;
  title: string;
  image: string;
  profileName: string;
  bookmarks: number;
  isFilled: boolean;
}

interface PostListProps {
  selectedCategory: number[];
  sortOption: string;
  handleBookmarkClick: (postId: number) => void;
  $isMypage: boolean;
}

const PostList: React.FC<PostListProps> = ({
  selectedCategory,
  sortOption,
  handleBookmarkClick,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMypage = location.pathname === '/mypage';
  const [showEditor, setShowEditor] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<number>(1);
  const [postsData, setPostsData] = useState<Post[]>([]);

  // 마이페이지 포스트 가져오기
  const getPostsForMypage = async () => {
    try {
      const response = await axiosInstance.get('/post/user/id');
      setPostsData(response.data);
    } catch (error) {
      console.error('Error fetching posts for mypage', error);
    }
  };

  // 일반 포스트 가져오기
  const getPostsForGeneral = async () => {
    try {
      const categoryQuery = selectedCategory.join(',');
      const response = await axiosInstance.get(
        `/posts?sort=${sortOption}&category=${categoryQuery}`,
      );
      setPostsData(response.data); // API 응답 데이터 설정
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  useEffect(() => {
    if (isMypage) {
      getPostsForMypage();
    } else {
      getPostsForGeneral();
    }
  }, [isMypage, categoryId, selectedCategory, sortOption]);

  const handleBookmarkToggle = (postId: number, e: React.MouseEvent, isFilled: boolean) => {
    e.stopPropagation();
    handleBookmarkClick(postId); // Call the bookmark click handler

    if (isFilled) {
      setShowEditor(null); // 스크랩을 취소하면 에디터 닫기
    } else {
      setShowEditor(postId); // 스크랩을 새로 추가하면 에디터 열기
    }
  };

  const closeEditor = () => {
    setShowEditor(null); // Close the editor manually
  };

  return (
    <>
      <S.PostList $isMypage={isMypage}>
        {postsData.map((post) => (
          <S.PostItem key={post.id} onClick={() => navigate(`/post/${post.id}`)}>
            <S.PostImage $isMypage={isMypage}>
              <S.ProfileContainer>
                <S.ProfileImage />
                <S.ProfileName>{post.profileName}</S.ProfileName>
              </S.ProfileContainer>
              <S.BookmarkContainer>
                <S.BookmarkIcon
                  $isFilled={post.isFilled}
                  onClick={(e) => handleBookmarkToggle(post.id, e, post.isFilled)} // 클릭 시 스크랩 상태에 따라 에디터 제어
                />
                <S.BookmarkCount>{post.bookmarks}</S.BookmarkCount>
              </S.BookmarkContainer>
            </S.PostImage>
            <S.PostTitle $isMypage={isMypage}>{post.title}</S.PostTitle>
          </S.PostItem>
        ))}
      </S.PostList>

      {showEditor !== null && (
        <ScrapEditorSection
          showEditor={true}
          closeEditor={closeEditor}
          postid={showEditor}
          thumbnail={postsData.find((post) => post.id === showEditor)?.image}
        />
      )}
    </>
  );
};

export default PostList;
