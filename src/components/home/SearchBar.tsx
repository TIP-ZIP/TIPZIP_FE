// components/SearchBar.tsx
import React from 'react';
import * as S from '@pages/home/Home.Styled';

const SearchBar: React.FC = () => {
  return (
    <S.SearchBar>
      <S.SearchIcon />
      <S.SearchInput type='text' placeholder='어떤 꿀팁이 궁금하신가요?' />
    </S.SearchBar>
  );
};

export default SearchBar;
