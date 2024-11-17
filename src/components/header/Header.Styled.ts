import styled from 'styled-components';
import logo from '@assets/svgs/Logo.svg';
import bookmark from '@assets/svgs/Bookmark.svg';
import profile from '@assets/svgs/Profile.svg';
import logout from '@assets/svgs/Logout.svg';

export const Container = styled.div`
  width: 100%;
  max-width: 768px;
  min-width: 375px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  height: 5.1rem;
  position: fixed;
  top: 0rem;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.TZ_Monochrome[0]};
`;

export const ItemList = styled.div`
  margin: 0 2rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const Logo = styled.div`
  background: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  width: 9.23rem;
  height: 2.13rem;
  cursor: pointer;
`;

export const IconList = styled.div`
  display: flex;
  gap: 0.6rem;
  width: 100%;
  max-width: 7.2rem;
  align-items: center;
  justify-content: flex-end;
`;
export const Icon = styled.div`
  display: flex;
  width: 2rem;
  height: 2rem;
  justify-content: center;
  align-items: center;
`;

export const LogoutIcon = styled.div`
  background: url(${logout});
  background-size: contain;
  background-repeat: no-repeat;
  width: 1.58rem;
  height: 1.54rem;
  cursor: pointer;
  transform: scale(1.2);
`;

export const BookmarkIcon = styled.div`
  background: url(${bookmark});
  background-size: contain;
  background-repeat: no-repeat;
  width: 1.29rem;
  height: 1.6rem;
  cursor: pointer;
  transform: scale(1.2);
`;

export const ProfileIcon = styled.div`
  background: url(${profile});
  background-size: contain;
  background-repeat: no-repeat;
  width: 1.2rem;
  height: 1.6rem;
  cursor: pointer;
  transform: scale(1.2);
`;
