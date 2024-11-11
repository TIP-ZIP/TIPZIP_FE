import React from 'react';
import * as S from './Header.Styled';

const Header: React.FC = () => {
  return (
    <S.Container>
      <S.ItemList>
        <S.Logo />
        <S.IconList>
          <S.Icon>
            <S.BookmarkIcon />
          </S.Icon>
          <S.Icon>
            <S.ProfileIcon />
          </S.Icon>
        </S.IconList>
      </S.ItemList>
    </S.Container>
  );
};
export default Header;
