import React from 'react';
import * as S from './Header.Styled';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 추후 로그인 로직 추가
  const isLoggedIn = true;

  return (
    <S.Container>
      <S.ItemList>
        <S.Logo onClick={() => navigate('/home')} />
        <S.IconList>
          {isLoggedIn && location.pathname === '/mypage' && (
            <S.Icon>
              <S.LogoutIcon />
            </S.Icon>
          )}
          <S.Icon>
            <S.BookmarkIcon />
          </S.Icon>
          <S.Icon>
            <S.ProfileIcon onClick={() => navigate('/mypage')} />
          </S.Icon>
        </S.IconList>
      </S.ItemList>
    </S.Container>
  );
};
export default Header;
