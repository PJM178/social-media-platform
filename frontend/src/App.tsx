import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import { useUserInfo } from './hooks/useUserInfo';
import { useQuery } from '@apollo/client';

import { LOGIN_ON_LOAD } from './queries/user';

import HomePage from './components/HomePage';
import SigninForm from './components/SigninForm';
import Header from './components/Header';
import SidePanel from './components/SidePanel';
import PostForm from './components/PostForm';
import RegisterForm from './components/RegisterForm';

const App = () => {
  const [theme, setTheme] = useState<string | null>(window.localStorage.getItem('theme'));
  const { username, likedPosts, setName, setLikedPosts, setUserId, setUsername } = useUserInfo();

  const { loading, error, data } = useQuery(LOGIN_ON_LOAD, {
    skip: username !== null,
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      setName(data.loginOnLoad.name);
      setUserId(data.loginOnLoad.id);
      setUsername(data.loginOnLoad.username);
      setLikedPosts(data.loginOnLoad.likedPosts);
    }
  });

  console.log('app', username, likedPosts);
  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
      window.localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // useEffect(() => {
  //   if (data) {
  //     setName(data.loginOnLoad.name);
  //     setUserId(data.loginOnLoad.id);
  //     setUsername(data.loginOnLoad.username);
  //     setLikedPosts(data.loginOnLoad.likedPosts);
  //     console.log('context');
  //   }
  // }, [data]);
  console.log('app', loading, data, error);

  if (username) {
    return (
      <div>
        <Header theme={theme} setTheme={setTheme} />
        <SidePanel />
        <Routes>
          <Route path='/new-post' element={<PostForm />} />
          <Route path='/' element={<HomePage />} />
          {/* <Route path='/signin' element={<HomePage />} /> */}
          <Route path='/signin' element={<SigninForm />} />
          <Route path='/register' element={<RegisterForm />} />
        </Routes>
      </div>
    );
  } else if (error) {
    return (
      <div>
        <Header theme={theme} setTheme={setTheme} />
        <SidePanel />
        <Routes>
          <Route path='/new-post' element={<PostForm />} />
          <Route path='/' element={<HomePage />} />
          {/* <Route path='/signin' element={<HomePage />} /> */}
          <Route path='/signin' element={<SigninForm />} />
          <Route path='/register' element={<RegisterForm />} />
        </Routes>
      </div>
    );
  } else {
    return <div style={{ display: 'flex', justifyContent: 'center' }}><div style={{ marginTop: '100px' }} className='loading'>...</div></div>;
  }
};

export default App;
