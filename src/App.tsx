import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '@pages/home/Home';
import Layout from './layout/Layout';
import Post from '@pages/post/Post';
import TagSelector from '@pages/tag/TagSelector';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/post/new' element={<Post onSubmit={(data) => console.log(data)} />} />
          <Route path='/tag' element={<TagSelector />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
