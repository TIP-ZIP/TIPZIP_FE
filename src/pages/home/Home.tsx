import React, { useState } from 'react';
import * as S from './Home.Styled';
import LoginModalContainer from '@components/home/LoginModalContainer';
import SearchBar from '@components/home/SearchBar/SearchBar';
import SelectBar from '@components/home/SelectBar/SelectBar';
import CategoryList from '@components/home/CategoryList/CategoryList';
import PostList from '@components/home/PostList/PostList';
import Dropdown from '@components/home/Dropdown/DropDown';
import { useNavigate } from 'react-router-dom';
import useCategory from '@hooks/home/useCategory';
import useSort from '@hooks/home/useSort';

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVerify, setSelectedVerify] = useState(false);
  const [selectedItem, setSelectedItem] = useState('전체');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const { selectedCategory, handleCategoryClick, categoryList, selectedCategoryNumbers } =
    useCategory();
  const { sortOption, selectedSort, handleSortOptionClick } = useSort();

  const handleClose = () => {
    setShowModal(false);
  };

  const handleLogin = () => {
    console.log('로그인 처리 로직');
    setShowModal(false);
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
          categories={categoryList}
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
          selectedCategory={selectedCategoryNumbers}
          sortOption={selectedSort}
          selectedItem={selectedItem}
          handleBookmarkClick={handleBookmarkClick}
          isVerify={selectedVerify}
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
