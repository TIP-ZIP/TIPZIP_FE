import { Outlet, useLocation } from 'react-router-dom';
import * as S from './Layout.Styled';
import Header from '@components/header/Header';

export default function Layout() {
  const location = useLocation();

  const hideHeaderPaths = ['/login', '/search', '/', '/set-username'];
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <S.Container $shouldHideHeader={shouldHideHeader}>
      {!shouldHideHeader && <Header />}
      <Outlet />
    </S.Container>
  );
}
