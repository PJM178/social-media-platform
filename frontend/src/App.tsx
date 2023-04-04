import { useEffect } from 'react';
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
import Profile from './components/Profile';
import SinglePost from './components/SinglePost';
import ErrorModal from './components/ErrorModal';

import { useTheme } from './hooks/useTheme';

const App = () => {
  const { theme, errorMessage } = useTheme();
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
      setLikedPosts(data.loginOnLoad.userLikedPosts);
    }
  });

  console.log('app', username, likedPosts);
  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
      window.localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // console.log('app', loading, data, error);

  if (username || error) {
    return (
      <div>
        <Header />
        <SidePanel />
        <Routes>
          <Route path='/new-post' element={<PostForm />} />
          <Route path='/' element={<HomePage />} />
          {/* <Route path='/signin' element={<HomePage />} /> */}
          <Route path='/signin' element={<SigninForm />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/profile/:username' element={<Profile />} />
          <Route path='/profile/:username/:id' element={<SinglePost />} />
        </Routes>
        {errorMessage && <ErrorModal />}
      </div>
    );
  // } else if (error) {
  //   return (
  //     <div>
  //       <Header />
  //       <SidePanel />
  //       <Routes>
  //         <Route path='/new-post' element={<PostForm />} />
  //         <Route path='/' element={<HomePage />} />
  //         {/* <Route path='/signin' element={<HomePage />} /> */}
  //         <Route path='/signin' element={<SigninForm />} />
  //         <Route path='/register' element={<RegisterForm />} />
  //       </Routes>
  //     </div>
  //   );
  } else {
    return <div style={{ display: 'flex', justifyContent: 'center' }}><div style={{ marginTop: '100px' }} className='loading'>...</div></div>;
  }
};

export default App;
