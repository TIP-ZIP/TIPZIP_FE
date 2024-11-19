import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@pages/home/Home';
import Layout from './layout/Layout';
import Post from '@pages/post/Post';
import SearchPost from '@pages/search/SearchPost';
import OnBoarding from '@pages/OnBoarding/OnBoarding';
import Login from '@pages/Login/Login';
import SetUsername from '@pages/SetUsername/SetUsername';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<OnBoarding />} />
          <Route path='/login' element={<Login />} />
          <Route path='/set-username' element={<SetUsername />} />
          <Route path='/home' element={<Home />} />
          <Route path='/search' element={<SearchPost />} />
          <Route path='/post/new' element={<Post />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
