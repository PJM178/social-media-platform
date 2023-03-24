import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_POST } from '../mutations/post';
import { GET_ALL_POSTS } from '../queries/post';
import { useUserInfo } from '../hooks/useUserInfo';

const PostForm = () => {
  const { userId } = useUserInfo();
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  console.log(userId);

  const [addPost, { data, loading, error }] = useMutation(ADD_POST, {
    refetchQueries: [{ query: GET_ALL_POSTS }],
    onError: (error) => {
      console.log(error);
    },
  });

  console.log(data, loading, error);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPost({ variables: { content, title, userId: Number(userId) } });
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