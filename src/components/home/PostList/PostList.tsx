import React, { useState, useEffect } from 'react';
import * as S from './PostList.Styled';
import { useLocation, useNavigate } from 'react-router-dom';
import ScrapEditorSection from '@components/postdetail/ScrapEditorSection';
import axiosInstance from '@api/axios';

interface Post {
  id: number;
  title: string;
  thumbnail_url: string;
  author: string | null;
  scrapCount: number;
  scrap: boolean;
}

interface PostListProps {
  selectedCategory: number[];
  sortOption: string;
  selectedItem: string;
  handleBookmarkClick: (postId: number) => void;
  isVerify: boolean;
  posts: Post[]; // 기존 prop 정의 수정
  searchQuery: string;
  selectedTags: string[];
}

const PostList: React.FC<PostListProps> = ({
  selectedCategory,
  sortOption,
  selectedItem,
  handleBookmarkClick,
  isVerify,
  searchQuery,
  posts,
  selectedTags,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMypage = location.pathname === '/mypage';
  const [showEditor, setShowEditor] = useState<number | null>(null);
  const [postsData, setPostsData] = useState<Post[]>(posts || []);
  const token = localStorage.getItem('accessToken');
  const isSearchPage = location.pathname.includes('/home/search');
  // 마이페이지 포스트 가져오기
  const getPostsForMypage = async () => {
    try {
      const id = '변희민'; //userid 받아오기
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
      console.log(response.data);
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
    if (searchQuery || (selectedTags && selectedTags.length > 0)) {
      console.log(searchQuery || selectedTags);
      setPostsData(posts);
    } else {
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
      } else if (isMypage) {
        getPostsForMypage(); // 마이페이지 포스트
      }
    }
  }, [searchQuery, selectedTags, selectedCategory, sortOption, selectedItem, isVerify]);

  const handleBookmarkToggle = async (postId: number, e: React.MouseEvent, scrap: boolean) => {
    e.stopPropagation();

    try {
      // 요청 데이터 설정
      const requestData = { postId, folder_name: null };
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setShowEditor(postId);

      if (scrap) {
        // DELETE 요청에서 'data'는 두 번째 인자에 포함
        const response = await axiosInstance.delete('/scrap', { ...config, data: requestData });
      } else {
        // POST 요청에서 'data'는 본문에 포함
        const response = await axiosInstance.post('/scrap', requestData, config);
      }

      handleBookmarkClick(postId);
      if (scrap) {
      } else {
        setShowEditor(postId);
      }
    } catch (error) {
      console.error('Error toggling bookmark', error);
      alert('북마크 처리 중 오류가 발생했습니다.');
    }
  };

  const closeEditor = () => {
    setShowEditor(null);
  };

  return (
    <>
      <S.PostList $isMypage={isMypage} $isSearchPage={isSearchPage}>
        {postsData.map((post) => (
          <S.PostItem key={post.id} onClick={() => navigate(`/post/${post.id}`)}>
            <S.PostImage $isMypage={isMypage}>
              <S.ProfileContainer>
                <S.ProfileImage />
                <S.ProfileName>{post.author ? post.author : '사용자'}</S.ProfileName>
              </S.ProfileContainer>
              <S.BookmarkContainer>
                <S.BookmarkIcon
                  $isFilled={post.scrap}
                  onClick={(e) => handleBookmarkToggle(post.id, e, post.scrap)} // 클릭 시 스크랩 상태에 따라 에디터 제어
                />
                <S.BookmarkCount>{post.scrapCount}</S.BookmarkCount>
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
          thumbnail={postsData.find((post) => post.id === showEditor)?.thumbnail_url}
          category=''
        />
      )}
    </>
  );
};

export default PostList;
