import React, { useState } from 'react';
import * as S from './SearchPost.Styled';
import { useNavigate } from 'react-router-dom';
import { CATEGORY_TAGS } from '@constants/TagData';

const SearchPost: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState('최신순');
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    const query = `/home/search?sort=${encodeURIComponent(selectedSort)}&search=${encodeURIComponent(searchQuery)}&tags=${encodeURIComponent(selectedTags.join(','))}`;
    navigate(query);
  };

  const toggleTagSelection = (tag: string) => {
    setSelectedTags(
      (prevTags) =>
        prevTags.includes(tag)
          ? prevTags.filter((t) => t !== tag) // 태그가 이미 선택된 경우 제거
          : [...prevTags, tag], // 태그가 선택되지 않은 경우 추가
    );
  };

  const handleTagOptionClick = () => {
    if (selectedTags.length > 0) {
      setSearchQuery(selectedTags.join(' '));
      const query = `/home/search?sort=${encodeURIComponent(selectedSort)}&search=${encodeURIComponent(searchQuery)}&tags=${encodeURIComponent(selectedTags.join(','))}`;
      navigate(query);
    }
  };

  return (
    <S.Container>
      <S.SearchBox>
        <S.BackBtn onClick={() => navigate(-1)} />
        <S.SearchBar $isFocused={isFocused}>
          <S.SearchInput
            type='text'
            placeholder='어떤 꿀팁이 궁금하신가요?'
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setIsFocused(true)} // 포커스 시 배경색 변경
            onBlur={() => setIsFocused(false)}
          />
          <S.SearchIcon onClick={handleSearchSubmit} />
        </S.SearchBar>
      </S.SearchBox>
      {isFocused ? null : (
        <>
          <S.TagOption $active={selectedTags.length > 0} onClick={handleTagOptionClick}>
            <S.TagOptionText $active={selectedTags.length > 0}>
              선택한 태그로 검색하기
            </S.TagOptionText>
            <S.WhiteSearchIcon />
          </S.TagOption>
          <S.TagContainer>
            {Object.entries(CATEGORY_TAGS).map(([category, tags]) => (
              <S.CategoryWrapper key={category}>
                <S.CategoryTitle>{category}</S.CategoryTitle>
                <S.TagList>
                  {tags.map((tag) => (
                    <S.TagItem
                      key={tag}
                      $active={selectedTags.includes(tag)}
                      onClick={() => toggleTagSelection(tag)}
                    >
                      {tag}
                    </S.TagItem>
                  ))}
                </S.TagList>
              </S.CategoryWrapper>
            ))}
          </S.TagContainer>
        </>
      )}
    </S.Container>
  );
};

export default SearchPost;
