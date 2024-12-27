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
  const [isClicked, setIsClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태 추가
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // 선택된 태그 상태 추가
  const token = localStorage.getItem('accessToken');
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

  const handleBookmarkClick = async (postId: number) => {
    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }
    try {
      const response = await axiosInstance.post(
        '/scrap',
        { postId, folder_name: null },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
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
      }
    } catch (error) {
      console.error('API 호출 중 오류가 발생했습니다.', error);
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

  const fetchPostsFromQuery = async () => {
    try {
      const query = `/search?search=${encodeURIComponent(searchQuery)}&tags=${encodeURIComponent(selectedTags.join(','))}`;
      const response = await axiosInstance.get(query);
      setPosts(response.data); // API에서 받아온 데이터를 posts 상태에 저장
    } catch (error) {
      console.error('검색 결과를 가져오는 중 오류가 발생했습니다.', error);
    }
  };

  // 검색어와 태그가 변경되면 API 호출 처리
  const handleSearchSubmit = async () => {
    const query = `/home?search=${encodeURIComponent(searchQuery)}&tags=${encodeURIComponent(selectedTags.join(','))}`;
    navigate(query); // URL에 쿼리 파라미터를 추가하고 홈 페이지로 이동
  };

  const { search } = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(search);
    const query = params.get('search') || '';
    const tags = params.get('tags') ? params.get('tags')?.split(',') : [];
    setSearchQuery(query);
    setSelectedTags(tags || []);
  }, [search]);

  // 쿼리 파라미터에 변화가 있으면 포스트를 새로 불러옴
  useEffect(() => {
    if (searchQuery || selectedTags.length > 0) {
      fetchPostsFromQuery(); // 검색어와 태그에 맞는 게시글을 API에서 가져옴
    }
  }, [searchQuery, selectedTags]);

  return (
    <S.HomeLayout>
      <S.Container>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          handleSearchSubmit={handleSearchSubmit} // 검색 처리 함수 추가
        />
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
          posts={posts} // 검색된 포스트 전달
          searchQuery=''
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
