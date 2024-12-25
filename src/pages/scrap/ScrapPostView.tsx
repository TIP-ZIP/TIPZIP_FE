// ScrapPostView.tsx

import React, { useState } from 'react';
import * as S from './ScrapPostView.Styled';
import CategoryList from '../../components/home/CategoryList/CategoryList';
import PostList from '../../components/home/PostList/PostList';
import ScrapHeaderImage from '@assets/svgs/ScrapHeader.svg';
import ArrowLeftWhite from '@assets/svgs/ArrowLeftWhite.svg';
import { useNavigate, useParams } from 'react-router-dom';

const ScrapPostView: React.FC = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const decodedCategoryName = decodeURIComponent(categoryName || '');

  // 카테고리 상태 관리
  const categories = [
    '정리/공간 활용', '주방', '청소', '건강', 'IT', 
    '뷰티&패션', '로컬', '여가&휴식', '기타'
  ];
  const [selectedCategory, setSelectedCategory] = useState<string[]>(['정리/공간 활용']);

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
    setSelectedCategory([category]); // 단일 선택만 가능하도록 설정
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
          maxWidth='calc(100% - 2rem)'
          categories={categories}
          selectedCategory={selectedCategory}
          handleCategoryClick={handleCategoryClick}
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
