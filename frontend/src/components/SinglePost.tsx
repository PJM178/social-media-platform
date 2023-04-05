import { useLocation } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';

import { GET_SINGLE_POST } from '../queries/post';
import { ADD_COMMENT } from '../mutations/post';
import { Comment } from '../types/comment';
import { SinglePostType } from '../types/post';
import { useUserInfo } from '../hooks/useUserInfo';

import Post from './Post';

const SinglePost = () => {
  const { userId } = useUserInfo();
  const [comment, setComment] = useState<string>('');
  const location = useLocation();
  const { loading, data, error } = useQuery<SinglePostType>(GET_SINGLE_POST, {
    variables: { id: Number(location.state.id) },
    onError: (error) => {
      console.log(error);
    },
  });

  const [addComment, result] = useMutation<Comment>(ADD_COMMENT, {
    onError: (error) => {
      console.log(error);
    },
    refetchQueries: [{ query: GET_SINGLE_POST }],
    onCompleted: (data) => console.log(data),
  });
  console.log(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addComment({ variables: { userId: Number(userId), postId: Number(data?.singlePost.id), comment: comment } });
  };

  console.log(location.state);
  if (!loading && data) {
    return (
      <>
        <section className='post-container'>
          <Post post={data.singlePost} />
        </section>
        <form onSubmit={handleSubmit}>
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
          <input type='submit' />
        </form>
        <section className='post-container'>
          {data.singlePost.comments.map(comment =>
            <article key={Number(comment.id)} className='post'>
              <div >{comment.comment}</div>
            </article>
          )}
        </section>
      </>
    );
  } else {
    return (
      <section className='post-container'>
        <Post post={location.state} />
      </section>
    );
  }
};

export default SinglePost;