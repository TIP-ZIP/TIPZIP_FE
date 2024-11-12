import React, { useState } from 'react';
import * as S from './Home.Styled';

const postsData = [
  {
    id: 1,
    title: '찜기 없이, 젓가락 하나로 만두 굽는 법',
    image: 'Postexample.svg',
    profileName: '꾸러기',
    bookmarks: 102,
    isFilled: false,
  },
  {
    id: 2,
    title: '찜기 없이, 젓가락 하나로 만두 굽는 법',
    image: 'Postexample.svg',
    profileName: '뇽뇽맘',
    bookmarks: 12,
    isFilled: false,
  },
  {
    id: 3,
    title: '찜기 없이, 젓가락 하나로 만두 굽는 법',
    image: 'Postexample.svg',
    profileName: '원채영',
    bookmarks: 500,
    isFilled: false,
  },
  {
    id: 4,
    title: '찜기 없이, 젓가락 하나로 만두 굽는 법',
    image: 'Postexample.svg',
    profileName: '엄경호',
    bookmarks: 1,
    isFilled: false,
  },
  {
    id: 5,
    title: '찜기 없이, 젓가락 하나로 만두 굽는 법',
    image: 'Postexample.svg',
    profileName: '김철흥',
    bookmarks: 2,
    isFilled: false,
  },
  {
    id: 6,
    title: '찜기 없이, 젓가락 하나로 만두 굽는 법',
    image: 'Postexample.svg',
    profileName: '마루누나',
    bookmarks: 199,
    isFilled: false,
  },
];

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [selectedVerify, setSelectedVerify] = useState(false);
  const [selectedItem, setSelectedItem] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('최신순');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [posts, setPosts] = useState(postsData);
  const [count, setCount] = useState(100);
  const categories = [
    '정리/공간 활용',
    '주방',
    '청소',
    '건강',
    'IT',
    '뷰티&패션',
    '여가&휴식',
    '로컬',
    '기타',
  ];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(
      (prev) =>
        prev.includes(category)
          ? prev.filter((cat) => cat !== category) // 이미 선택된 카테고리라면 배열에서 제거
          : [...prev, category], // 선택되지 않은 카테고리라면 배열에 추가
    );
  };

  const handleSortOptionClick = (option: string) => {
    setSortOption(option);
    setIsDropdownOpen(false);
    setIsOpen(false);
  };

  const handleSelectVerifyClick = () => {
    setSelectedVerify(!selectedVerify);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsDropdownOpen((prev) => !prev);
  };

  const handleBookmarkClick = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isFilled: !post.isFilled,
              bookmarks: post.isFilled ? post.bookmarks - 1 : post.bookmarks + 1,
            }
          : post,
      ),
    );
  };

  return (
    <S.HomeLayout>
      <S.Container>
        <S.SearchBar>
          <S.SearchIcon />
          <S.SearchInput type='text' placeholder='어떤 꿀팁이 궁금하신가요?' />
        </S.SearchBar>
        <S.SelectBar>
          <S.SelectItem $selected={selectedItem === '전체'} onClick={() => setSelectedItem('전체')}>
            전체
          </S.SelectItem>
          <S.SelectItem
            $selected={selectedItem === '팔로잉'}
            onClick={() => setSelectedItem('팔로잉')}
          >
            팔로잉
          </S.SelectItem>
        </S.SelectBar>
        <S.CategoryList>
          {categories.map((category, index) => (
            <S.CategoryItem
              key={index}
              $selectedtag={selectedCategory.includes(category)}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </S.CategoryItem>
          ))}
        </S.CategoryList>
        <S.PostInfoBar>
          <S.DropdownContainer>
            <S.DropdownButton onClick={toggleDropdown}>
              {sortOption}
              <S.Arrow $isOpen={isOpen} />
            </S.DropdownButton>
            {isDropdownOpen && (
              <S.DropdownList>
                {['최신순', '오래된 순', '인기순'].map((option) => (
                  <S.DropdownItem
                    key={option}
                    selected={sortOption === option}
                    onClick={() => handleSortOptionClick(option)}
                  >
                    {option}
                  </S.DropdownItem>
                ))}
              </S.DropdownList>
            )}
          </S.DropdownContainer>
          <S.SelectVerify $selectedVerify={selectedVerify} onClick={handleSelectVerifyClick}>
            <S.Star $selectedVerify={selectedVerify} />
            <S.VerifyText $selectedVerify={selectedVerify}>인증된 유저만 보기</S.VerifyText>
          </S.SelectVerify>
        </S.PostInfoBar>

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
      </S.Container>
      <S.Plus />
    </S.HomeLayout>
  );
};
export default Home;
