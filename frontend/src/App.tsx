import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import { useUserInfo } from './hooks/useUserInfo';
import { useMutation, useQuery } from '@apollo/client';

import HomePage from './components/HomePage';
import SigninForm from './components/SigninForm';
import Header from './components/Header';
import SidePanel from './components/SidePanel';
import PostForm from './components/PostForm';
import { LOGIN_ON_LOAD } from './queries/user';

const App = () => {
  const [theme, setTheme] = useState<string | null>(window.localStorage.getItem('theme'));
  const { username, likedPosts, setName, setLikedPosts, setUserId, setUsername } = useUserInfo();

  const { loading, error, data } = useQuery(LOGIN_ON_LOAD, {
    onError: (error) => {
      console.log(error);
    },
  });

  console.log(username, likedPosts);
  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
      window.localStorage.setItem('theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    // loginOnLoad();
  }, []);

  useEffect(() => {
    if (data) {
      setName(data.loginOnLoad.name);
      setUserId(data.loginOnLoad.id);
      setUsername(data.loginOnLoad.username);
      setLikedPosts(data.loginOnLoad.likedPosts);
    }
  }, [data]);
  console.log('app', loading);
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
