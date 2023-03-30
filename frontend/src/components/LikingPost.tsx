import { useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';

import { EDIT_LIKES } from '../mutations/post';
import { GET_ALL_POSTS } from '../queries/post';
import { PostProps } from '../types/post';
import { useUserInfo } from '../hooks/useUserInfo';

import DislikeModal from './DislikeModal';

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

const LikingPost = ({ post, delay }: PostProps) => {
  let timeouts: NodeJS.Timeout[] = [];
  const [dislikeDelay, setDislikeDelay] = useState<boolean>(false);
  const [go, setGo] = useState<boolean>(false);
  const [dir, setDir] = useState<string>('');
  const [clearTimer, setClearTimer] = useState<boolean>(false);
  const { likedPosts, userId, setLikedPosts } = useUserInfo();
  console.log('delay', delay);
  console.log('dislikedelay', dislikeDelay);
  console.log('go', go);
  console.log('clearTime', clearTimer);

  const [editLikes, { loading, error }] = useMutation(EDIT_LIKES, {
    refetchQueries: [{ query: GET_ALL_POSTS }],
    onError: ({ graphQLErrors }) => {
      if (graphQLErrors[0].extensions.argumentName === 'inc') {
        setLikedPosts((likedPosts || []).filter(posts => posts.id !== post.id));
      } else if (graphQLErrors[0].extensions.argumentName === 'dec') {
        setLikedPosts([...likedPosts || [], { content: post.content, id: post.id, likes: post.likes - 1, title: post.title, __typename: post.__typename, user: { username: post.user.username, __typename: post.user.__typename } }]);
      }
      console.log(error);
      console.log(graphQLErrors[0].extensions.argumentName);
      console.log(graphQLErrors[0].message);
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
      setLikedPosts([...likedPosts || [], { content: post.content, id: post.id, likes: post.likes + 1, title: post.title, __typename: post.__typename, user: { username: post.user.username, __typename: post.user.__typename } }]);
      editLikes({ variables: { id: post.id, type: direction, userId: userId },
        optimisticResponse: {
          editLikes: {
            type: direction,
            message: '',
            post: { title: post.title, content: post.content, id: post.id, likes: post.likes },
            __typename: 'likedPostResponse'
          },
        },
      });
    } else if (!loading) {
      if (delay) {
        setDir(direction);
        setGo(true);
        setClearTimer(false);
      } else if (!delay) {
        setLikedPosts((likedPosts || []).filter(posts => posts.id !== post.id));
        editLikes({ variables: { id: post.id, type: direction, userId: userId },
          optimisticResponse: {
            editLikes: {
              type: direction,
              message: '',
              post: { title: post.title, content: post.content, id: post.id, likes: post.likes },
              __typename: 'likedPostResponse'
            },
          },
        });
      }
    }
  };

  // useEffect for modal timeout to cancel like delete
  useEffect(() => {
    if (go && delay) {
      timeouts.push(setTimeout(() => {
        console.log('timer');
        setGo(false);
        setDislikeDelay(true);
        setLikedPosts((likedPosts || []).filter(posts => posts.id !== post.id));
        editLikes({ variables: { id: post.id, type: dir, userId: userId },
          optimisticResponse: {
            editLikes: {
              type: dir,
              message: '',
              post: { title: post.title, content: post.content, id: post.id, likes: post.likes },
              __typename: 'likedPostResponse'
            },
          },
        });
      }, 2000));
      if (clearTimer) {
        console.log('clear timer', timeouts);
        timeouts.forEach(timeout => clearTimeout(timeout));
        console.log(timeouts);
        timeouts = [];
      }
      return () => timeouts.forEach(timeout => clearTimeout(timeout));
    }
  }, [go, clearTimer]);

  // Check the likedPosts array and if the user exists from context
  if (userId) {
    if (likedPosts?.some(likedPost => likedPost.id === post.id)) {
      return (
        <>
          {delay && go && !clearTimer && <DislikeModal timeouts={timeouts} setClearTimer={setClearTimer} />}
          <div className='liking-post-button' onClick={() => handleLikePost('dec')} style={{ color: '#FF006F' }}>&#9829;</div>
        </>
      );
    } else {
      return (
        <>
          <div className='liking-post-button' onClick={() => handleLikePost('inc')} style={{ color: '#FF006F' }}>&#x2661;</div>
        </>
      );
    }
  } else {
    return null;
  }
};

export default LikingPost;