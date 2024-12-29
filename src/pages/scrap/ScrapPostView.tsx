// ScrapPostView.tsx

import React, { useState, useEffect, useMemo } from 'react';
import * as S from './ScrapPostView.Styled';
import CategoryList from '../../components/home/CategoryList/CategoryList';
import PostList from '../../components/home/PostList/PostList';
import ScrapHeaderImage from '@assets/svgs/ScrapHeader.svg';
import ArrowLeftWhite from '@assets/svgs/ArrowLeftWhite.svg';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axiosInstance from '../../api/axios';

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
    const fetchCategoryPosts = async () => {
      if (type !== 'category' || !categoryId) return;
      
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/scrap/category/${categoryId}`);
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          console.error('API response is not an array:', response.data);
          setPosts([]);
        }
      } catch (err) {
        console.error('Failed to fetch category posts:', err);
        setError('게시물을 불러오는데 실패했습니다.');
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryPosts();
  }, [categoryId, type]);

  const transformedPosts = useMemo(() => {
    if (!Array.isArray(posts)) return [];
    
    return posts.map(post => ({
      id: post.post_id,
      title: post.title,
      image: post.thumbnail_url,
      profileName: '',
      bookmarks: post.scrapCount,
      isFilled: post.scrap
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
          />
        )}
      </S.ContentContainer>
    </S.Container>
  );
};

export default ScrapPostView;
