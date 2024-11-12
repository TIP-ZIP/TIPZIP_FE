import React, { useState } from 'react';
import * as S from './Home.Styled';
import LoginModalContainer from '@components/home/LoginModalContainer';
import SearchBar from '@components/home/SearchBar';
import SelectBar from '@components/home/SelectBar';
import CategoryList from '@components/home/CategoryList';
import PostList from '@components/home/PostList';
import Dropdown from '@components/home/DropDown';

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
  const [selectedVerify, setSelectedVerify] = useState(false);
  const [selectedItem, setSelectedItem] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('최신순');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [posts, setPosts] = useState(postsData);
  const [showModal, setShowModal] = useState(true);
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
    setSelectedCategory((prev) =>
      prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category],
    );
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const handleLogin = () => {
    console.log('로그인 처리 로직');
    setShowModal(false);
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
      <LoginModalContainer
        showModal={showModal}
        handleClose={handleClose}
        handleLogin={handleLogin}
      />
      <S.Container>
        <SearchBar />
        <SelectBar selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          handleCategoryClick={handleCategoryClick}
        />
        <S.PostInfoBar>
          <Dropdown
            isOpen={isOpen}
            sortOption={sortOption}
            handleSortOptionClick={handleSortOptionClick}
            toggleDropdown={toggleDropdown}
          />
          <S.SelectVerify $selectedVerify={selectedVerify} onClick={handleSelectVerifyClick}>
            <S.Star $selectedVerify={selectedVerify} />
            <S.VerifyText $selectedVerify={selectedVerify}>인증된 유저만 보기</S.VerifyText>
          </S.SelectVerify>
        </S.PostInfoBar>
        <PostList posts={posts} handleBookmarkClick={handleBookmarkClick} />
      </S.Container>
    </S.HomeLayout>
  );
};
export default Home;
