import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import useAuth from '@hooks/useAuth';

import LoginModalContainer from '@components/home/LoginModalContainer';
import { LogoutModal } from '@components/modal/LogoutModal';
import { TipZipLogo } from '@components/Icons/TipZipLogo';

import * as S from './Header.Styled';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, validateToken, logout } = useAuth();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const logoColor = location.pathname === '/mypage' ? 'black' : '';

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };
  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };
  const handleLogout = () => {
    // React hook useAuth 내 logout 함수 호출
    logout();
    window.location.href = '/home';
  };

  const handleLoginRequired = useCallback(
    (callback: () => void) => {
      if (isAuthenticated) {
        callback();
      } else {
        setShowLoginModal(true); // 로그인되지 않았으면 로그인 모달 띄우기
      }
    },
    [isAuthenticated],
  );

  const handleProfileClick = () => {
    handleLoginRequired(() => navigate('/mypage')); // 로그인 후 마이페이지로 이동
  };

  const handleBookmarkClick = () => {
    handleLoginRequired(() => navigate('/scrap')); // 로그인 후 북마크 페이지로 이동
  };

  return (
    <>
      <S.Container>
        <S.ItemList>
          <div style={{ cursor: 'pointer' }}>
            <TipZipLogo
              onClick={() => {
                window.location.href = '/home';
              }}
              color={logoColor}
              width='9.23rem'
              height='2.13rem'
            />
          </div>
          <S.IconList>
            {isAuthenticated && location.pathname === '/mypage' && (
              <S.Icon onClick={handleLogoutClick}>
                <S.LogoutIcon />
              </S.Icon>
            )}
            <S.Icon onClick={handleBookmarkClick}>
              <S.BookmarkIcon />
            </S.Icon>

            <S.Icon onClick={handleProfileClick}>
              <S.ProfileIcon />
            </S.Icon>
          </S.IconList>
        </S.ItemList>
      </S.Container>
      <LogoutModal showModal={showLogoutModal} onClose={handleCloseModal} onLogout={handleLogout} />
      {showLoginModal && (
        <LoginModalContainer
          showModal={showLoginModal}
          handleClose={() => setShowLoginModal(false)}
          handleLogin={() => {
            setShowLoginModal(false);
            navigate('/login');
          }}
        />
      )}
    </>
  );
};
export default Header;
