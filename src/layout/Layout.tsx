import { Outlet, useLocation } from 'react-router-dom';
import * as S from './Layout.Styled';
import Header from '@components/header/Header';

export default function Layout() {
  // 추후 페이지에 따른 헤더 컴포넌트 등장 여부 코드 추가
  const location = useLocation();

  const restrictedPaths = ['/'];
  const isRestricted = restrictedPaths.includes(location.pathname);

  return (
    <S.Container $noPadding={isRestricted}>
      <Header />
      <Outlet />
    </S.Container>
  );
}
