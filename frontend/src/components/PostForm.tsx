import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_POST } from '../mutations/post';
import { GET_ALL_POSTS } from '../queries/post';
import { useUserInfo } from '../hooks/useUserInfo';

interface UserType {
  username: string
  __typename: string
}

interface PostType {
  content: string
  id: string
  likes: number
  title: string
  user: UserType
  __typename: string
}

interface DataType {
  allPosts: PostType[]
}

const PostForm = () => {
  const { userId, username } = useUserInfo();
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  console.log(userId);

  const [addPost, { data, loading, error }] = useMutation(ADD_POST, {
    refetchQueries: [{ query: GET_ALL_POSTS }],
    onError: (error) => {
      console.log(error);
    },
    update: (store, { data: { addPost } }) => {
      const data: DataType | null = store.readQuery({ query: GET_ALL_POSTS });
      console.log(data);
      addPost = { ...addPost, id: 'temp-id', likes: 0, user: { __typename: 'User', username: username } };
      console.log('update', data?.allPosts);
      console.log('update', addPost);
      const newData: DataType = { allPosts: [addPost, ...(data?.allPosts || [])] };
      console.log(newData);
      // data && (data.allPosts = [...newData, addPost]);
      console.log('update post push', data);
      store.writeQuery({ query: GET_ALL_POSTS, data: newData });
    }
  });

  console.log(data, loading, error);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPost({ variables: { content, title, userId: Number(userId) },
      optimisticResponse: {
        addPost: {
          content: content,
          title: title,
          id: 'temp-id',
          __typename: 'Post',
        },
      },
    });
    setContent('');
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>{error?.message}</div>
      <input placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder='Content' value={content} onChange={(e) => setContent(e.target.value)} />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default PostForm;