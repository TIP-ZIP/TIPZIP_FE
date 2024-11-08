import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '@pages/home/Home';
import Layout from '@components/layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
