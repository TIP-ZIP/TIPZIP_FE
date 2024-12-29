import React, { useState, useEffect } from 'react';
import * as S from './Home.Styled';
import LoginModalContainer from '@components/home/LoginModalContainer';
import SearchBar from '@components/home/SearchBar/SearchBar';
import SelectBar from '@components/home/SelectBar/SelectBar';
import CategoryList from '@components/home/CategoryList/CategoryList';
import PostList from '@components/home/PostList/PostList';
import Dropdown from '@components/home/Dropdown/DropDown';
import { useNavigate, useLocation } from 'react-router-dom';
import useCategory from '@hooks/home/useCategory';
import useSort from '@hooks/home/useSort';
import useAuth from '@hooks/useAuth';
import axiosInstance from '@api/axios';

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVerify, setSelectedVerify] = useState(false);
  const [selectedItem, setSelectedItem] = useState('전체');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false); // 검색 여부 상태
  const [isClicked, setIsClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isSearchPage = location.pathname.includes('/home/search');

  const { selectedCategory, handleCategoryClick, categoryList, selectedCategoryNumbers } =
    useCategory();
  const { sortOption, selectedSort, handleSortOptionClick } = useSort();

  const sortMapping: Record<string, string> = {
    최신순: 'recent',
    '오래된 순': 'oldest',
    인기순: 'popular',
  };

  const apiSortOption = sortMapping[selectedSort];

  const handleOption = (option: string) => {
    handleSortOptionClick(option);
    setIsOpen(false);
    if (isSearching) {
      fetchPostsFromQuery(option);
    }
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

  const fetchPostsFromQuery = async (updatedSort?: string) => {
    try {
      const sort = updatedSort ? sortMapping[updatedSort] : apiSortOption || 'recent';
      const query = `/search?sort=${encodeURIComponent(sort)}&search=${encodeURIComponent(
        searchQuery,
      )}&tags=${encodeURIComponent(selectedTags.join(','))}`;
      const response = await axiosInstance.get(query);
      setPosts(response.data); // API 응답 데이터를 상태에 저장
    } catch (error) {
      console.error('검색 결과를 가져오는 중 오류가 발생했습니다.', error);
    }
  };

  const handleSearchSubmit = () => {
    setIsSearching(true);
    fetchPostsFromQuery();
    const query = `/home/search?sort=${encodeURIComponent(
      apiSortOption,
    )}&search=${encodeURIComponent(searchQuery)}&tags=${encodeURIComponent(
      selectedTags.join(','),
    )}`;
    navigate(query);
  };

  const { search } = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(search);
    const query = params.get('search') || '';
    const tags = params.get('tags')
      ? params
          .get('tags')
          ?.split(',')
          .map((tag) => tag.replace('#', ''))
      : [];
    const sort = params.get('sort') || 'recent';
    const translatedSort =
      Object.keys(sortMapping).find((key) => sortMapping[key] === sort) || '최신순'; // 기본값으로 '최신순' 사용

    setSearchQuery(query);
    setSelectedTags(tags || []);
    handleSortOptionClick(translatedSort); // 한글 값으로 변환하여 처리
  }, [search]);

  useEffect(() => {
    if (isSearchPage && (searchQuery || selectedTags.length > 0)) {
      setIsSearching(true);
      fetchPostsFromQuery();
    } else {
      setIsSearching(false); // 검색 상태 비활성화
    }
  }, [searchQuery, selectedTags, isSearchPage]);

  return (
    <S.HomeLayout>
      <S.Container>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          handleSearchSubmit={handleSearchSubmit}
        />
        {!isSearchPage && (
          <>
            <SelectBar selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            <CategoryList
              $maxWidth='calc(100% - 4rem)'
              categories={categoryList}
              selectedCategory={selectedCategory}
              handleCategoryClick={handleCategoryClick}
            />
          </>
        )}
        <S.PostInfoBar $isSearchPage={isSearchPage}>
          <Dropdown
            isOpen={isOpen}
            sortOption={sortOption}
            handleSortOptionClick={handleOption}
            toggleDropdown={toggleDropdown}
          />
          {!isSearchPage && (
            <S.SelectVerify $selectedVerify={selectedVerify} onClick={handleSelectVerifyClick}>
              <S.Star $selectedVerify={selectedVerify} />
              <S.VerifyText $selectedVerify={selectedVerify}>인증된 유저만 보기</S.VerifyText>
            </S.SelectVerify>
          )}
        </S.PostInfoBar>
        <>
          {(searchQuery || selectedTags.length > 0) && posts.length === 0 ? (
            <S.NoResultsText>검색결과가 존재하지 않습니다.</S.NoResultsText>
          ) : (
            <PostList
              selectedCategory={selectedCategoryNumbers || []}
              sortOption={selectedSort}
              selectedItem={selectedItem}
              isVerify={selectedVerify}
              posts={posts || []}
              searchQuery={searchQuery || ''}
              selectedTags={selectedTags || []}
              $isMypage={false}
            />
          )}
        </>
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
