import { useQuery } from '@apollo/client';

import { GET_USER } from '../queries/user';

import AllPosts from './AllPosts';
import PostForm from './PostForm';

const HomePage = () => {
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