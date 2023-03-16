import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_USER } from './queries/user';

import Header from './components/Header';
import AllPosts from './components/AllPosts';
import SidePanel from './components/SidePanel';
import PostForm from './components/PostForm';

const App = () => {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { singleUserId: 2 }
  });

  console.log(data, loading, error);

  useEffect(() => {
    const currentTheme = window.localStorage.getItem('theme');
    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme);
    }
  }, []);

  return (
    <div>
      <Header />
      {data && <AllPosts user={data.singleUser} />}
      <SidePanel />
      <PostForm />
    </div>
  );
};

export default App;
