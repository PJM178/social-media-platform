import { useQuery } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';

import { GET_ALL_POSTS } from '../queries/post';
import { PostType } from '../types/post';
import Post from './Post';
import LikingPost from './LikingPost';

const AllPosts = () => {
  const navigate = useNavigate();
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

  const handleNavigate = (user: string, postId: number, post: PostType) => {
    navigate(`/profile/${user}/${postId}`, { state: post });
  };

  return (
    <section className='post-container'>
      {data ? data.allPosts?.map((post: PostType) => (
        <Post key={post.id} post={post} />
      )) : null}
    </section>
  );
};
export default AllPosts;