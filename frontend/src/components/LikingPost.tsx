import { useMutation } from '@apollo/client';

import { EDIT_LIKES } from '../mutations/post';
import { GET_ALL_POSTS } from '../queries/post';
import { PostProps } from '../types/post';
import { useUserInfo } from '../hooks/useUserInfo';

const LikingPost = ({ post }: PostProps) => {
  const { likedPosts, userId, setLikedPosts } = useUserInfo();

  const [editLikes, { data, loading, error }] = useMutation(EDIT_LIKES, {
    onCompleted: (data) => {
      if (data.editLikes.type === 'inc') {
        setLikedPosts([...likedPosts, { postId: Number(post.id), userId: Number(userId) }]);
      } else {
        setLikedPosts(likedPosts.filter(posts => posts.postId !== Number(post.id)));
      }
    },
    refetchQueries: [{ query: GET_ALL_POSTS }],
    onError: (error) => {
      console.log(error);
    },
  });

  console.log(data);

  const handleLikePost = (direction: 'dec' | 'inc') => {
    if (direction === 'inc') {
      editLikes({ variables: { id: post.id, type: direction, userId: userId } });
    } else {
      editLikes({ variables: { id: post.id, type: direction, userId: userId } });
    }
  };
  console.log(likedPosts);
  console.log(Number(post.id));
  console.log(likedPosts.some(likedPost => likedPost.postId === Number(post.id)));
  if (likedPosts.some(likedPost => likedPost.postId === Number(post.id))) {
    return <div onClick={() => handleLikePost('dec')} style={{ color: '#FF006F' }}>&#9829;</div>;
  } else {
    return <div onClick={() => handleLikePost('inc')} style={{ color: '#FF006F' }}>&#x2661;</div>;
  }
};

export default LikingPost;