// ScrapPostView.tsx

import React, { useState, useEffect, useMemo } from 'react';
import * as S from './scrappostview.styled';
import CategoryList from '../../components/home/categorylist/CategoryList';
import PostList from '../../components/home/postlist/PostList';
import ScrapHeaderImage from '@assets/svgs/ScrapHeader.svg';
import ArrowLeftWhite from '@assets/svgs/ArrowLeftWhite.svg';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axiosInstance from '@api/axios';

interface ScrapPost {
  post_id: number;
  title: string;
  scrap: boolean;
  scrapCount: number;
  thumbnail_url: string;
}

const ScrapPostView: React.FC = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams<{ categoryName: string }>();
  const { state } = useLocation();
  const type = state?.type as 'category' | 'personal';
  const categoryId = state?.categoryId;
  
  const [posts, setPosts] = useState<ScrapPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const decodedCategoryName = useMemo(() => {
    if (!categoryName) return '';
    try {
      return decodeURIComponent(categoryName).replace(/\s+/g, '');
    } catch {
      return categoryName;
    }
  }, [categoryName]);

  const categories = useMemo(() => [
    '정리/공간 활용', '주방', '청소', '건강', 'IT', 
    '뷰티&패션', '로컬', '여가&휴식', '기타'
  ], []);

  const [selectedCategory, setSelectedCategory] = useState<string[]>(() => {
    if (type === 'category' && decodedCategoryName) {
      const matchedCategory = categories.find(category => {
        const normalizedCategory = category.replace(/\s+/g, '');
        return normalizedCategory === decodedCategoryName;
      });
      
      if (matchedCategory) {
        return [matchedCategory];
      }
    }
    return ['정리/공간 활용'];
  });

  useEffect(() => {
    if (type === 'category' && decodedCategoryName) {
      const matchedCategory = categories.find(category => {
        const normalizedCategory = category.replace(/\s+/g, '');
        return normalizedCategory === decodedCategoryName;
      });
      
      if (matchedCategory) {
        setSelectedCategory([matchedCategory]);
      }
    }
  }, [type, decodedCategoryName, categories]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      console.log('스크랩 API 호출 시작:', { type, categoryId, categoryName: state?.originalName });
      
      try {
        let response;
        if (type === 'category' && categoryId) {
          response = await axiosInstance.get(`/scrap/category/${categoryId}`);
        } else if (type === 'personal' && state?.originalName) {
          const encodedFolderName = state.originalName
            .split('')
            .map((char: string) => {
              if (/[a-zA-Z0-9가-힣]/.test(char)) {
                return char;
              }
              return encodeURIComponent(char);
            })
            .join('');
          
          console.log('나만의 스크랩 API 호출:', { 
            originalName: state.originalName,
            encodedName: encodedFolderName,
            url: `/scrap/${encodedFolderName}`
          });
          
          response = await axiosInstance.get<ScrapPost[]>(`/scrap/${encodedFolderName}`, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-Original-Folder-Name': state.originalName
            }
          });
        } else {
          console.log('API 호출 중단: 필요한 파라미터 없음', { 
            type, 
            categoryId, 
            folderName: state?.originalName 
          });
          return;
        }

        console.log('스크랩 API 응답:', response);
        
        if (Array.isArray(response.data)) {
          setPosts(response.data);
          console.log('설정된 포스트:', response.data);
        } else {
          console.error('API 응답이 배열이 아님:', response.data);
          setPosts([]);
        }
      } catch (err: any) {
        console.error('스크랩 API 호출 실패:', err);
        console.error('에러 상세:', {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message,
          url: err.config?.url,
          headers: err.config?.headers,
          originalName: state?.originalName
        });
        setError('게시물을 불러오는데 실패했습니다.');
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [categoryId, type, state?.originalName]);

  const transformedPosts = useMemo(() => {
    return posts.map((post) => ({
      id: post.post_id,
      title: post.title,
      thumbnail_url: post.thumbnail_url,
      author: '',
      profile_image: '',
      category: 0,
      scrapCount: post.scrapCount,
      scrap: post.scrap,
    }));
  }, [posts]);

  const handleCategoryClick = (category: string) => {
    if (type === 'category') return;
    setSelectedCategory([category]);
  };

  const handleBookmarkClick = (postId: number) => {
    // 북마크 처리 로직
    console.log('bookmark clicked:', postId);
  };

  return (
    <S.Container>
      <S.HeaderContainer>
        <S.HeaderImageWrapper>
          <S.HeaderBackground src={ScrapHeaderImage} alt="header" />
          <S.BackIconWrapper>
            <S.BackButton onClick={() => navigate(-1)}>
              <img src={ArrowLeftWhite} alt="back" />
            </S.BackButton>
          </S.BackIconWrapper>
          <S.HeaderText>{decodedCategoryName}</S.HeaderText>
        </S.HeaderImageWrapper>
        
        <S.HeaderCategoryBar>
          <CategoryList
            $maxWidth='calc(100% - 2rem)'
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryClick={handleCategoryClick}
            isDisabled={type === 'category'}
          />
        </S.HeaderCategoryBar>
      </S.HeaderContainer>

      <S.ContentContainer>
        {isLoading ? (
          <div>로딩 중...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <PostList
            posts={transformedPosts}
            handleBookmarkClick={handleBookmarkClick}
            $isMypage={false}
            selectedCategory={[]}
            sortOption=""
            selectedItem=""
            isVerify={false}
            searchQuery=""
            selectedTags={[]}
          />
        )}
      </S.ContentContainer>
    </S.Container>
  );
};

export default ScrapPostView;
