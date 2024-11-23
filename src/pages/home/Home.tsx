import React, { useState } from 'react';
import * as S from './Home.Styled';
import LoginModalContainer from '@components/home/LoginModalContainer';
import SearchBar from '@components/home/SearchBar/SearchBar';
import SelectBar from '@components/home/SelectBar/SelectBar';
import CategoryList from '@components/home/CategoryList/CategoryList';
import PostList from '@components/home/PostList/PostList';
import Dropdown from '@components/home/Dropdown/DropDown';
import { postsData } from '@constants/PostData';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVerify, setSelectedVerify] = useState(false);
  const [selectedItem, setSelectedItem] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('최신순');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [posts, setPosts] = useState(postsData);
  const [showModal, setShowModal] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
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

  const handlePlusClick = () => {
    setIsClicked((prev) => !prev);
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
        <PostList
          posts={posts}
          handleBookmarkClick={handleBookmarkClick}
          $isMypage={window.location.pathname === '/mypage'}
        />
      </S.Container>
      {isClicked && (
        <S.OrangeBubble onClick={() => navigate('/post/new')}>
          <S.Whiteedit />
          <S.BubbleText>나의 팁 공유하기</S.BubbleText>
        </S.OrangeBubble>
      )}
      <S.PlusBtn $isClicked={isClicked} onClick={handlePlusClick} />
    </S.HomeLayout>
  );
};
export default Home;
