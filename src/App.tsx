import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './layout/Layout';

import OnBoarding from '@pages/OnBoarding/OnBoarding';
import Home from '@pages/home/Home';
import Login from '@pages/Login/Login';
import SetUsername from '@pages/SetUsername/SetUsername';
import SearchPost from '@pages/search/SearchPost';
import Post from '@pages/post/Post';
import PostDetail from '@pages/PostDetail/PostDetail';
import Mypage from '@pages/mypage/Mypage';
import { useEffect } from 'react';
import setVhProperty from './utils/setVhProperty';

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
