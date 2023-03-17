import { PostProps } from '../types/post';
import { useMutation } from '@apollo/client';

import { EDIT_LIKES } from '../mutations/post';
import { GET_ALL_POSTS } from '../queries/post';

const Post = ({ post, user }: PostProps) => {
  const [editLikes, { data, loading, error }] = useMutation(EDIT_LIKES, {
    refetchQueries: [{ query: GET_ALL_POSTS }]
  });

  console.log(data, loading, error);

  const handleLikePost = async (direction: 'dec' | 'inc') => {
    await editLikes({ variables: { id: String(post.id), type: direction } });
  };

  return (
    <article className='post'>
      <h4>Username: {post.user.username}</h4>
      <div>Title: {post.title}</div>
      <div>Content: {post.content}</div>
      <div>Likes: {post.likes}</div>
      {user.likedPosts.some(likedPost => likedPost.postId === Number(post.id))
        ? <div onClick={() => handleLikePost('inc')} style={{ color: '#FF006F' }}>&#9829;</div>
        : <div style={{ color: '#FF006F' }}>&#x2661;</div>
      }
    </article>
  );
};

export default Post;