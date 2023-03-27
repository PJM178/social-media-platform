import { useMutation } from '@apollo/client';
import { useState } from 'react';

import { EDIT_LIKES } from '../mutations/post';
import { GET_ALL_POSTS } from '../queries/post';
import { PostProps, PostType } from '../types/post';
import { useUserInfo } from '../hooks/useUserInfo';

// Types
interface CacheUserType {
  username: string | null
  __typename: string
}

interface CachePostType {
  content: string
  id: number
  likes: number
  title: string
  user: CacheUserType
  __typename: string
}

interface CacheDataType {
  allPosts: CachePostType[]
}

const LikingPost = ({ post }: PostProps) => {
  const { username, likedPosts, userId, setLikedPosts } = useUserInfo();

  const [editLikes, { data, loading, error }] = useMutation(EDIT_LIKES, {
    refetchQueries: [{ query: GET_ALL_POSTS }],
    onError: (error) => {
      console.log(error);
    },
    update: (store, { data: { editLikes } }) => {
      const data: CacheDataType | null = store.readQuery({ query: GET_ALL_POSTS });
      if (editLikes.type === 'inc') {
        console.log(data?.allPosts.findIndex(posts => Number(posts.id) === Number(post.id)));
        const postIndex = data?.allPosts.findIndex(posts => Number(posts.id) === Number(post.id));
        const editedPost = { ...post, likes: post.likes + 1 };
        if (typeof postIndex === 'number') {
          const dataToSplice = { allPosts: [...data?.allPosts || []] };
          dataToSplice.allPosts.splice(postIndex, 1, editedPost);
          store.writeQuery({ query: GET_ALL_POSTS, data: dataToSplice });
        }
      } else if (editLikes.type === 'dec') {
        const postIndex = data?.allPosts.findIndex(posts => Number(posts.id) === Number(post.id));
        const editedPost = { ...post, likes: post.likes - 1 };
        if (typeof postIndex === 'number') {
          const dataToSplice = { allPosts: [...data?.allPosts || []] };
          dataToSplice.allPosts.splice(postIndex, 1, editedPost);
          store.writeQuery({ query: GET_ALL_POSTS, data: dataToSplice });
        }
      }
    },
  });

  const handleLikePost = (direction: 'dec' | 'inc') => {
    if (direction === 'inc' && !loading) {
      setLikedPosts([...likedPosts, { postId: Number(post.id), userId: Number(userId) }]);
      editLikes({ variables: { id: post.id, type: direction, userId: userId },
        optimisticResponse: {
          editLikes: {
            // id: 'tempId',
            // userId: userId,
            type: direction,
            message: '',
            post: { title: post.title, content: post.content, id: post.id, likes: post.likes },
            __typename: 'likedPostResponse'
          },
        },
      });
    } else if (!loading) {
      setLikedPosts(likedPosts.filter(posts => posts.postId !== Number(post.id)));
      editLikes({ variables: { id: post.id, type: direction, userId: userId },
        optimisticResponse: {
          editLikes: {
            // id: 'tempId',
            // userId: userId,
            type: direction,
            message: '',
            post: { title: post.title, content: post.content, id: post.id, likes: post.likes },
            __typename: 'likedPostResponse'
          },
        },
      });
    }
  };

  // Check the likedPosts array from context
  if (likedPosts.some(likedPost => likedPost.postId === Number(post.id))) {
    return (
      <>
        <div onClick={() => handleLikePost('dec')} style={{ color: '#FF006F' }}>&#9829;</div>
      </>
    );
  } else {
    return (
      <>
        <div onClick={() => handleLikePost('inc')} style={{ color: '#FF006F' }}>&#x2661;</div>
      </>
    );
  }
};

export default LikingPost;