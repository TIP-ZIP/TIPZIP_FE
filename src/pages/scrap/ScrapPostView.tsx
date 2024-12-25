// ScrapPostView.tsx

import React, { useState, useEffect, useMemo } from 'react';
import * as S from './ScrapPostView.Styled';
import CategoryList from '../../components/home/CategoryList/CategoryList';
import PostList from '../../components/home/PostList/PostList';
import ScrapHeaderImage from '@assets/svgs/ScrapHeader.svg';
import ArrowLeftWhite from '@assets/svgs/ArrowLeftWhite.svg';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const ScrapPostView: React.FC = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams<{ categoryName: string }>();
  const { state } = useLocation();
  const type = state?.type as 'category' | 'personal';
  
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

  // 임시 게시물 데이터
  const posts = [
    {
      id: 1,
      title: '화장대 정리법 세 가지!',
      image: '',
      profileName: '민영일상',
      bookmarks: 102,
      isFilled: true
    },
    // ... 더 많은 게시물 데이터
  ];

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
        <PostList
          posts={posts}
          handleBookmarkClick={handleBookmarkClick}
          $isMypage={false}
        />
      </S.ContentContainer>
    </S.Container>
  );
};

export default ScrapPostView;
