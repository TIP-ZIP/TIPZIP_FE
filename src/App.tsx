import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './layout/Layout';

import OnBoarding from '@pages/onboarding/OnBoarding';
import Home from '@pages/home/Home';
import Login from '@pages/login/Login';
import SetUsername from '@pages/SetUsername/SetUsername';
import SearchPost from '@pages/search/SearchPost';
import Post from '@pages/post/Post';
import PostDetail from '@pages/PostDetail/PostDetail';
import Mypage from '@pages/mypage/Mypage';
import { useEffect } from 'react';
import setVhProperty from './utils/setVhProperty';
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
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
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
