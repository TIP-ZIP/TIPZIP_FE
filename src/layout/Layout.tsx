import { matchPath, Outlet, useLocation } from 'react-router-dom';
import * as S from './layout.styled';
import Header from '@components/header/Header';

export default function Layout() {
  const location = useLocation();

  const hideHeaderPaths = ['/', '/login', '/set-username', '/search', '/post'];
  const shouldHideHeader =
    hideHeaderPaths.includes(location.pathname) || !!matchPath('/post/:id', location.pathname);

  return (
    <S.Container $shouldHideHeader={shouldHideHeader}>
      {!shouldHideHeader && <Header />}
      <Outlet />
    </S.Container>
  );
}
