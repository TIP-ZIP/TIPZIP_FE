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
  selectedItem: string;
  handleBookmarkClick: (postId: number) => void;
  isVerify: boolean;
}

const PostList: React.FC<PostListProps> = ({
  selectedCategory,
  sortOption,
  selectedItem,
  handleBookmarkClick,
  isVerify,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMypage = location.pathname === '/mypage';
  const [showEditor, setShowEditor] = useState<number | null>(null);
  const [postsData, setPostsData] = useState<Post[]>([]);
  const token = localStorage.getItem('accessToken');

  // 마이페이지 포스트 가져오기
  const getPostsForMypage = async () => {
    try {
      const id = 1; //userid 받아오기
      const response = await axiosInstance.get(`/post/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPostsData(response.data);
    } catch (error) {
      console.error('Error fetching posts for mypage', error);
    }
  };

  // 일반 포스트 가져오기
  const getPostsForGeneral = async () => {
    try {
      const categoryQuery = selectedCategory.map((category) => `category=${category}`).join('&');
      const response = await axiosInstance.get(`/posts?sort=${sortOption}&${categoryQuery}`);
      setPostsData(response.data);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  // 팔로잉 포스트 가져오기
  const getPostsForFollowing = async () => {
    try {
      const categoryQuery = selectedCategory.map((category) => `category=${category}`).join('&');
      const response = await axiosInstance.get(
        `/posts/following?sort=${sortOption}&${categoryQuery}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setPostsData(response.data);
    } catch (error) {
      console.error('Error fetching posts for following', error);
    }
  };

  const getPostsForCertifiedUsers = async (isFollow: boolean) => {
    try {
      const categoryQuery = selectedCategory.map((category) => `category=${category}`).join('&');
      const response = await axiosInstance.get(
        `/posts/cert?sort=${sortOption}&${categoryQuery}&is_follow=${isFollow}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setPostsData(response.data);
    } catch (error) {
      console.error('Error fetching posts for certified users', error);
    }
  };

  useEffect(() => {
    if (selectedItem === '팔로잉') {
      if (isVerify) {
        getPostsForCertifiedUsers(true); // 팔로잉에서 인증된 유저 보기
      } else {
        getPostsForFollowing(); // 팔로잉에서 일반 포스트 보기
      }
    } else if (selectedItem === '전체') {
      if (isVerify) {
        getPostsForCertifiedUsers(false); // 전체에서 인증된 유저 보기
      } else {
        getPostsForGeneral(); // 전체에서 일반 포스트 보기
      }
    } else {
      getPostsForMypage(); // 마이페이지 포스트
    }
  }, [selectedCategory, sortOption, selectedItem, isVerify]);

  const handleBookmarkToggle = (postId: number, e: React.MouseEvent, isFilled: boolean) => {
    e.stopPropagation();
    handleBookmarkClick(postId);

    if (isFilled) {
      setShowEditor(null);
    } else {
      setShowEditor(postId);
    }
  };

  const closeEditor = () => {
    setShowEditor(null);
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
