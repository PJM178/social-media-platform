import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router';

import { GET_USER } from '../queries/user';

import AllPosts from './AllPosts';
import PostForm from './PostForm';

const HomePage = () => {
  const { state } = useLocation();
  console.log(state);

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { singleUserId: 2 }
  });

  console.log(data, loading, error);

  return (
    <div>
      {data && <AllPosts user={data.singleUser} />}
      <PostForm />
    </div>
  );
};

export default HomePage;