import { useQuery } from '@apollo/client';

import { GET_ALL_POSTS } from '../queries/post';
import { PostType } from '../types/post';
import Post from './Post';

const AllPosts = () => {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);
  console.log(data);

  if (loading) {
    return (
      <section className='post-container'>
        <div>loading...</div>
      </section>
    );
  }

  if (error) {
    console.log(error);
  }

  return (
    <section className='post-container'>
      {data ? data.allPosts?.map((post: PostType) => (
        <Post key={post.id} post={post} />
      )) : null}
    </section>
  );
};
export default AllPosts;