import { useQuery } from '@apollo/client';

import { GET_ALL_POSTS } from '../queries/post';
import { PostType } from '../types/post';
import Post from './Post';
import LikingPost from './LikingPost';

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
        <article className='post' key={post.id}>
          <Post key={post.id} post={post} />
          <LikingPost post={post} />
        </article>
      )) : null}
    </section>
  );
};
export default AllPosts;