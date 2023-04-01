import { useLocation } from 'react-router';
import { useQuery } from '@apollo/client';

import { GET_SINGLE_POST } from '../queries/post';

import Post from './Post';

const SinglePost = () => {
  const location = useLocation();
  const { loading, data, error } = useQuery(GET_SINGLE_POST, {
    variables: { id: Number(location.state.id) },
    onError: (error) => {
      console.log(error);
    },
  });
  console.log(data);

  console.log(location.state);
  if (!loading) {
    return (
      <section className='post-container'>
        <Post post={data.singlePost} />
      </section>
    );
  } else {
    return (
      <section className='post-container'>
        <Post post={location.state} />
      </section>
    );
  }
};

export default SinglePost;