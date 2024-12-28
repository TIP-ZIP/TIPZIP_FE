import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import setVhProperty from '@utils/setVhProperty';

import Layout from './layout/Layout';

import OnBoarding from '@pages/OnBoarding/OnBoarding';
import Home from '@pages/Home/Home';

import Login from '@pages/Login/Login';
import KakaoRedirect from '@auth/redirects/KakaoRedirect';
import GoogleRedirect from '@auth/redirects/GoogleRedirect';
import NaverRedirect from '@auth/redirects/NaverRedirect';
import SetUsername from '@pages/SetUsername/SetUsername';

import SearchPost from '@pages/Search/SearchPost';
import Post from '@pages/Post/Post';
import PostDetail from '@pages/PostDetail/PostDetail';

import Mypage from '@pages/MyPage/Mypage';

import Scrap from '@pages/Scrap/Scrap';
import ScrapPostView from '@pages/Scrap/ScrapPostView';

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
          <Route path='/oauth' element={<KakaoRedirect />} />
          <Route path='/oauth/google' element={<GoogleRedirect />} />
          <Route path='/oauth/naver' element={<NaverRedirect />} />
          <Route path='/set-username' element={<SetUsername />} />
          <Route path='/search' element={<SearchPost />} />
          <Route path='/post/new' element={<Post />} />
          <Route path='/post/:id' element={<PostDetail />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/scrap' element={<Scrap />} />
          <Route path='/scrap/:type/:categoryName' element={<ScrapPostView />} />
          <Route path='/mypage/:userId' element={<Mypage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
