import { useLocation } from 'react-router';

import AllPosts from './AllPosts';
import PostForm from './PostForm';

const HomePage = () => {
  const { state } = useLocation();

  return (
    <div>
      <PostForm />
      <AllPosts />
    </div>
  );
};

export default HomePage;