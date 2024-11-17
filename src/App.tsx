import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './layout/Layout';
import OnBoarding from '@pages/OnBoarding/OnBoarding';
import Login from '@pages/Login/Login';
import SetUsername from '@pages/SetUsername/SetUsername';
import Home from '@pages/home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<OnBoarding />} />
          <Route path='/login' element={<Login />} />
          <Route path='/set-username' element={<SetUsername />} />
          <Route path='/home' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
