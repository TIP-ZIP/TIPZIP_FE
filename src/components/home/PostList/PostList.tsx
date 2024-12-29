import React, { useState, useEffect } from 'react';
import * as S from './PostList.Styled';
import { useLocation, useNavigate } from 'react-router-dom';
import ScrapEditorSection from '@components/postdetail/ScrapEditorSection';
import LoginModalContainer from '../LoginModalContainer';
import useAuth from '@hooks/useAuth';
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
  $isMypage: boolean;
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
  const isMypage = location.pathname.includes('/mypage');
  const [showEditor, setShowEditor] = useState<number | null>(null);
  const [postsData, setPostsData] = useState<Post[]>(posts || []);
  const token = localStorage.getItem('accessToken');
  const isSearchPage = location.pathname.includes('/home/search');
  const [showLoginModal, setShowLoginModal] = useState(false);

  // // 마이페이지 포스트 가져오기
  // const getPostsForMypage = async () => {
  //   try {
  //     const id = localStorage.getItem('userID');
  //     const response = await axiosInstance.get(`/posts/user/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     setPostsData(response.data);
  //   } catch (error) {
  //     console.error('Error fetching posts for mypage', error);
  //     setPostsData([]);
  //   }
  // };

  // 일반 포스트 가져오기
  const getPostsForGeneral = async () => {
    try {
      const categoryQuery = `category=${selectedCategory.join(',')}`;
      const response = await axiosInstance.get(`/posts?sort=${sortOption}&${categoryQuery}`);
      setPostsData(response.data);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  // 팔로잉 포스트 가져오기
  const getPostsForFollowing = async () => {
    try {
      const categoryQuery = `category=${selectedCategory.join(',')}`;
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
      setPostsData([]);
    }
  };

  const getPostsForCertifiedUsers = async (isFollow: boolean) => {
    try {
      const categoryQuery = `category=${selectedCategory.join(',')}`;
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
      setPostsData([]);
    }
  };
  useEffect(() => {
    // 마이페이지에서는 이미 넘겨받은 `posts` 데이터를 사용
    if (isMypage) {
      setPostsData(posts || []);
    } else {
      // 다른 경우에는 API를 호출하여 데이터를 가져옵니다.
      if (searchQuery || (selectedTags && selectedTags.length > 0)) {
        setPostsData(posts || []);
      } else {
        if (selectedItem === '팔로잉') {
          if (isVerify) {
            getPostsForCertifiedUsers(true);
          } else {
            getPostsForFollowing();
          }
        } else if (selectedItem === '전체') {
          if (isVerify) {
            getPostsForCertifiedUsers(false);
          } else {
            getPostsForGeneral();
          }
        }
      }
    }
  }, [
    searchQuery,
    selectedTags,
    selectedCategory,
    sortOption,
    selectedItem,
    isVerify,
    isMypage,
    posts,
  ]);

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
      if (scrap) {
        // DELETE 요청에서 'data'는 두 번째 인자에 포함
        const response = await axiosInstance.delete('/scrap', { ...config, data: requestData });
      } else {
        // POST 요청에서 'data'는 본문에 포함
        const response = await axiosInstance.post('/scrap', requestData, config);
      }

      handleBookmarkClick(postId);
      if (scrap) {
        setShowEditor(null);
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

  const handlePostClick = (postId: number) => {
    if (!token) {
      // 로그인되지 않은 경우, 로그인 모달을 띄운다
      setShowLoginModal(true);
    } else {
      // 로그인된 경우에는 포스트 상세 페이지로 이동
      navigate(`/post/${postId}`);
    }
  };

  return (
    <>
      <S.PostList $isMypage={isMypage} $isSearchPage={isSearchPage}>
        {Array.isArray(postsData) && postsData.length > 0 ? (
          postsData.map((post) => (
            <S.PostItem key={post.id} onClick={() => handlePostClick(post.id)}>
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
          ))
        ) : (
          <S.Nocontent>조회할 수 있는 글이 없어요!</S.Nocontent>
        )}
      </S.PostList>
      {showEditor !== null && (
        <ScrapEditorSection
          showEditor={true}
          closeEditor={closeEditor}
          postid={showEditor}
          thumbnail={postsData.find((post) => post.id === showEditor)?.thumbnail_url}
          category='' // Ensure category is properly passed or updated dynamically
        />
      )}

      {showLoginModal && (
        <LoginModalContainer
          showModal={showLoginModal}
          handleClose={() => setShowLoginModal(false)}
          handleLogin={() => {
            setShowLoginModal(false);
            navigate('/login');
          }}
        />
      )}
    </>
  );
};

export default PostList;
