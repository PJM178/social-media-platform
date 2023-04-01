import { useLocation } from 'react-router';
import { useQuery } from '@apollo/client';

import { GET_SINGLE_POST } from '../queries/post';
import { Comment } from '../types/comment';

import Post from './Post';
import { SinglePostType } from '../types/post';

const SinglePost = () => {
  const location = useLocation();
  const { loading, data, error } = useQuery<SinglePostType>(GET_SINGLE_POST, {
    variables: { id: Number(location.state.id) },
    onError: (error) => {
      console.log(error);
    },
  });
  console.log(data);

  console.log(location.state);
  if (!loading && data) {
    return (
      <>
        <section className='post-container'>
          <Post post={data.singlePost} />
        </section>
        <section className='post'>
          {data.singlePost.comments.map(comment =>
            <div key={Number(comment.id)}>{comment.comment}</div>
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