import React, { useState } from 'react';
import * as S from './Header.Styled';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogoutModal } from '@components/modal/LogoutModal';
import { TipZipLogo } from '@components/Icons/TipZipLogo';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const logoColor = location.pathname === '/mypage' ? 'black' : '';

  // 추후 로그인 로직 추가
  const isLoggedIn = true;

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };
  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };
  const handleLogout = () => {
    // 로그아웃 로직을 여기에 추가
    setShowLogoutModal(false);
  };

  return (
    <>
      <S.Container>
        <S.ItemList>
          <div style={{ cursor: 'pointer' }}>
            <TipZipLogo
              onClick={() => navigate('/home')}
              color={logoColor}
              width='9.23rem'
              height='2.13rem'
            />
          </div>
          <S.IconList>
            {isLoggedIn && location.pathname === '/mypage' && (
              <S.Icon onClick={handleLogoutClick}>
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
      <LogoutModal showModal={showLogoutModal} onClose={handleCloseModal} onLogout={handleLogout} />
    </>
  );
};
export default Header;
