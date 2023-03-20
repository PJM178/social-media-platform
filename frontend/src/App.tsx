import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';

import HomePage from './components/HomePage';
import SigninForm from './components/SigninForm';
import Header from './components/Header';
import SidePanel from './components/SidePanel';
import PostForm from './components/PostForm';

const App = () => {
  const [theme, setTheme] = useState<string | null>(window.localStorage.getItem('theme'));

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
      window.localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return (
    <div>
      <Header theme={theme} setTheme={setTheme} />
      <SidePanel />
      <Routes>
        <Route path='/new-post' element={<PostForm />} />
        <Route path='/' element={<HomePage />} />
        {/* <Route path='/signin' element={<HomePage />} /> */}
        <Route path='/signin' element={<SigninForm />} />
        <Route path='/register' element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
