import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@pages/home/Home';
import Layout from './layout/Layout';
import SearchPost from '@pages/search/SearchPost';

import Post from '@pages/post/Post';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<SearchPost />} />
          <Route path='/post/:id' element={<Post />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
