import React, { useState } from 'react';
import * as S from './SearchPost.Styled';

const SearchPost: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('검색어:', searchQuery);
  };

  return (
    <S.Container>
      <S.SearchBox>
        <S.BackBtn />
        <S.SearchBar $isFocused={isFocused}>
          <S.SearchInput
            type='text'
            placeholder='어떤 꿀팁이 궁금하신가요?'
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setIsFocused(true)} // 포커스 시 배경색 변경
            onBlur={() => setIsFocused(false)}
          />
          <S.SearchIcon />
        </S.SearchBar>
      </S.SearchBox>
      {/* 태그 컴포넌트 추가 */}
    </S.Container>
  );
};

export default SearchPost;
