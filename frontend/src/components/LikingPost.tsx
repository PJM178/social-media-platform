import { useMutation } from '@apollo/client';

import { EDIT_LIKES } from '../mutations/post';
import { GET_ALL_POSTS } from '../queries/post';
import { PostProps, PostType } from '../types/post';
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
    // refetchQueries: [{ query: GET_ALL_POSTS }],
    onError: (error) => {
      console.log(error);
    },
    // optimisticResponse: {
    //   editLikes: {
    //     __typename: 'likedPostResponse',
    //     message: 'You Disliked the post...',
    //     post: {
    //       title: 'jormamies',
    //       id: post.id,
    //       content: 'jep',
    //       likes: -9
    //     },
    //     type: 'dec'
    //   }
    // },
    // update: (cache, { data }) => {
    //   cache.updateQuery({ query: GET_ALL_POSTS }, ({ allPosts }) => {
    //     // const cachePost = allPosts.find((posts: { id: string }) => posts.id === data.editLikes.post.id);
    //     // const newPost = { ...cachePost, likes: 7 };
    //     console.log('cache', allPosts);
    //     // console.log('cache new post', newPost);
    //     console.log('cache data', data);
    //     // console.log('cache data', data.editLikes.post.id);
    //     // console.log('cache post', cachePost);
    //     // const filteredPosts = allP
    //     // return {
    //     //   allPosts: allPosts
    //     // };
    //   });
    // },
  });

  console.log('liking posts', data, loading);

  const handleLikePost = (direction: 'dec' | 'inc') => {
    if (direction === 'inc' && !loading) {
      editLikes({ variables: { id: post.id, type: direction, userId: userId } });
    } else if (!loading){
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