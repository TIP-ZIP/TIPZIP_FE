import React, { useState, useEffect } from 'react';
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
import useAuth from '@hooks/useAuth';

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVerify, setSelectedVerify] = useState(false);
  const [selectedItem, setSelectedItem] = useState('전체');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [isClicked, setIsClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const { selectedCategory, handleCategoryClick, categoryList, selectedCategoryNumbers } =
    useCategory();
  const { sortOption, selectedSort, handleSortOptionClick } = useSort();

  const handleOption = (option: string) => {
    handleSortOptionClick(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelectVerifyClick = () => {
    if (!isAuthenticated) {
      setShowModal(true);
    } else {
      setSelectedVerify(!selectedVerify);
    }
  };

  const handleBookmarkClick = (postId: number) => {
    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }
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

  const handleBubbleClick = () => {
    if (!isAuthenticated) {
      setShowModal(true);
      setIsClicked(false);
    } else {
      navigate('/post/new');
    }
  };

  useEffect(() => {
    if (selectedItem === '팔로잉' && !isAuthenticated) {
      setShowModal(true);
      setSelectedItem('전체');
    }
  }, [selectedItem, isAuthenticated]);

  return (
    <S.HomeLayout>
      <S.Container>
        <SearchBar />
        <SelectBar selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        <CategoryList
          $maxWidth='calc(100% - 4rem)'
          categories={categoryList}
          selectedCategory={selectedCategory}
          handleCategoryClick={handleCategoryClick}
        />
        <S.PostInfoBar>
          <Dropdown
            isOpen={isOpen}
            sortOption={sortOption}
            handleSortOptionClick={handleOption}
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
        <S.OrangeBubble onClick={handleBubbleClick}>
          <S.Whiteedit />
          <S.BubbleText>나의 팁 공유하기</S.BubbleText>
        </S.OrangeBubble>
      )}
      <S.PlusBtn $isClicked={isClicked} onClick={handlePlusClick} />

      {showModal && (
        <LoginModalContainer
          showModal={showModal}
          handleClose={() => setShowModal(false)}
          handleLogin={() => {
            setShowModal(false);
            navigate('/login');
          }}
        />
      )}
    </S.HomeLayout>
  );
};

export default Home;
