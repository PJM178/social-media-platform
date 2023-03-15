import { useEffect } from 'react';

import Header from './components/Header';
import AllPosts from './components/AllPosts';
import SidePanel from './components/SidePanel';
import PostForm from './components/PostForm';

const App = () => {

  useEffect(() => {
    const currentTheme = window.localStorage.getItem('theme');
    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme);
    }
  }, []);

  return (
    <div>
      <Header />
      <AllPosts />
      <SidePanel />
      <PostForm />
    </div>
  );
};

export default App;
