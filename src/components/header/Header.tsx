import React from 'react';
import * as S from './Header.Styled';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <S.Container>
      <S.ItemList>
        <S.Logo onClick={() => navigate('/home')} />
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
