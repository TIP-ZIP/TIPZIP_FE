import React, { useState, useEffect } from 'react';
import * as S from './PostList.Styled';
import { useLocation, useNavigate } from 'react-router-dom';
import ScrapEditorSection from '@components/postdetail/ScrapEditorSection';
import LoginModalContainer from '../LoginModalContainer';
import useCategory from '@hooks/home/useCategory';
import axiosInstance from '@api/axios';

interface Post {
  id: number;
  title: string;
  thumbnail_url: string;
  author: string | null;
  scrapCount: number;
  scrap: boolean;
  profile_image: string;
  category: number;
}

interface PostListProps {
  selectedCategory: number[];
  sortOption: string;
  $isMypage: boolean;
  selectedItem: string;
  isVerify: boolean;
  posts: Post[]; // 기존 prop 정의 수정
  searchQuery: string;
  selectedTags: string[];
}

interface ScrapData {
  post_id: number;
  folder: string | null; // optional
  category: number | null; // optional
}

const PostList: React.FC<PostListProps> = ({
  selectedCategory,
  sortOption,
  selectedItem,
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
  const [scrapData, setScrapData] = useState<ScrapData[]>([]);
  const token = localStorage.getItem('accessToken');
  const isSearchPage = location.pathname.includes('/home/search');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { categoryMap } = useCategory();

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

  const handleBookmarkToggle = async (post_id: number, e: React.MouseEvent, scrap: boolean) => {
    e.stopPropagation();

    try {
      const requestData = { post_id, folder: null };
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let response;
      if (scrap) {
        response = await axiosInstance.delete('/scrap', { ...config, data: requestData });
      } else {
        response = await axiosInstance.post('/scrap', requestData, config);
      }

      const updatedScrapData: ScrapData = response.data;

      // postsData에서 해당 포스트의 북마크 상태와 숫자 업데이트
      setPostsData((prevPostsData) =>
        prevPostsData.map((post) =>
          post.id === post_id
            ? {
                ...post,
                scrap: !scrap, // 북마크 상태 반전
                scrapCount: scrap ? post.scrapCount - 1 : post.scrapCount + 1, // 숫자 증가/감소
              }
            : post,
        ),
      );

      // 기존 scrapData 상태 업데이트
      setScrapData((prevScrapData) => {
        if (!Array.isArray(prevScrapData)) {
          return [updatedScrapData];
        }

        const existingScrapIndex = prevScrapData.findIndex((data) => data.post_id === post_id);
        if (existingScrapIndex >= 0) {
          const newScrapData = [...prevScrapData];
          newScrapData[existingScrapIndex] = updatedScrapData;
          return newScrapData;
        } else {
          return [...prevScrapData, updatedScrapData];
        }
      });

      // 북마크 클릭 핸들러 호출

      // 에디터 열기
      setShowEditor(scrap ? null : post_id);
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
              <S.PostImage $imageUrl={post.thumbnail_url} $isMypage={isMypage}>
                <S.ProfileContainer>
                  <S.ProfileImage $imageUrl={post.profile_image} />
                  <S.ProfileName>{post.author ? post.author : '사용자'}</S.ProfileName>
                </S.ProfileContainer>
                <S.BookmarkContainer>
                  <S.BookmarkIcon
                    $isFilled={post.scrap}
                    onClick={(e) => handleBookmarkToggle(post.id, e, post.scrap)}
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

      {showEditor !== null &&
        (() => {
          const selectedPost = postsData.find((post) => post.id === showEditor);
          console.log(selectedPost?.category);

          return (
            <ScrapEditorSection
              showEditor={true}
              closeEditor={closeEditor}
              postid={showEditor}
              thumbnail={selectedPost?.thumbnail_url || ''}
              category={selectedPost?.category || 1}
            />
          );
        })()}

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
