import { PostProps } from '../types/post';
import { useMutation } from '@apollo/client';

import { EDIT_LIKES } from '../mutations/post';
import { GET_ALL_POSTS } from '../queries/post';
import { useUserInfo } from '../hooks/useUserInfo';

const Post = ({ post }: PostProps) => {
  const { likedPosts, userId, setLikedPosts } = useUserInfo();
  const [editLikes, { data, loading, error }] = useMutation(EDIT_LIKES, {
    refetchQueries: [{ query: GET_ALL_POSTS }],
    onError: (error) => {
      console.log(error);
    }
  });
  // console.log(data, loading, error);

  const handleLikePost = async (direction: 'dec' | 'inc') => {
    await editLikes({ variables: { id: post.id, type: direction, userId: userId } });
    if (!likedPosts.some(posts => posts.postId === post.id && posts.userId === userId)) {
      setLikedPosts([...likedPosts, { postId: post.id, userId: userId }]);
    }
  };
  console.log('post', likedPosts);
  console.log('post', error, data);
  return (
    <article className='post'>
      <h4>Username: {post.user.username}</h4>
      <div>Title: {post.title}</div>
      <div>Content: {post.content}</div>
      <div>Likes: {post.likes}</div>
      {likedPosts?.some(likedPost => likedPost.postId === Number(post.id))
        ? <div onClick={() => handleLikePost('inc')} style={{ color: '#FF006F' }}>&#9829;</div>
        : <div onClick={() => handleLikePost('inc')} style={{ color: '#FF006F' }}>&#x2661;</div>
      }
    </article>
  );
};

export default Post;