import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import setVhProperty from '@utils/setVhProperty';

import Layout from './layout/Layout';

import OnBoarding from '@pages/onboarding/Onboarding';
import Home from '@pages/home/Home';

import Login from '@pages/login/Login';
import KakaoRedirect from '@auth/redirects/KakaoRedirect';
import GoogleRedirect from '@auth/redirects/GoogleRedirect';
import NaverRedirect from '@auth/redirects/NaverRedirect';
import SetUsername from '@pages/setusername/SetUsername';

import SearchPost from '@pages/search/SearchPost';
import Post from '@pages/post/Post';
import PostDetail from '@pages/postdetail/PostDetail';

import MyPage from '@pages/mypage/Mypage';

import Scrap from '@pages/scrap/Scrap';
import ScrapPostView from '@pages/scrap/ScrapPostView';

function App() {
  useEffect(() => {
    setVhProperty();

    window.addEventListener('resize', setVhProperty);
    return () => window.removeEventListener('resize', setVhProperty);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<OnBoarding />} />
          <Route path='/home/*' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/oauth/kakao' element={<KakaoRedirect />} />
          <Route path='/oauth/google' element={<GoogleRedirect />} />
          <Route path='/oauth/naver' element={<NaverRedirect />} />
          <Route path='/set-username' element={<SetUsername />} />
          <Route path='/search' element={<SearchPost />} />
          <Route path='/post/new' element={<Post />} />
          <Route path='/post/:id' element={<PostDetail />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/scrap' element={<Scrap />} />
          <Route path='/scrap/:type/:categoryName' element={<ScrapPostView />} />
          <Route path='/mypage/:writerid' element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
