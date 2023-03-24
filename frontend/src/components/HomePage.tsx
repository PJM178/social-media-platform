import { useLocation } from 'react-router';

import AllPosts from './AllPosts';
import PostForm from './PostForm';

const HomePage = () => {
  const { state } = useLocation();

  return (
    <div>
      <AllPosts />
      <PostForm />
    </div>
  );
};

export default HomePage;