import { useLocation } from 'react-router';

import Post from './Post';

const SinglePost = () => {
  const location = useLocation();
  console.log(location.state);
  return (
    <section className='post-container'>
      <Post post={location.state} />
    </section>
  );
};

export default SinglePost;