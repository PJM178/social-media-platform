import { useLocation } from 'react-router';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { GET_SINGLE_POST } from '../queries/post';
import { SinglePostType } from '../types/post';
import { useUserInfo } from '../hooks/useUserInfo';

import Post from './Post';
import CommentForm from './CommentForm';

const SinglePost = () => {
  const { username } = useUserInfo();
  const location = useLocation();
  const { id } = useParams();
  console.log('id params', id);

  const { loading, data, error } = useQuery<SinglePostType>(GET_SINGLE_POST, {
    variables: { id: Number(id) },
    onError: (error) => {
      console.log(error);
    },
    fetchPolicy: 'cache-and-network',
  });
  console.log('single post data', data);
  // console.log(location.state);
  if (!loading && data) {
    return (
      <>
        <section className='post-container'>
          <Post post={data.singlePost} />
        </section>
        {username && <section className="single-post-form-container">
          <CommentForm post={data.singlePost} />
        </section>}
        <section className='post-container'>
          {data.singlePost.comments.map(comment =>
            <article key={Number(comment.id)} className='post'>
              <div>Username: {comment.user.username}</div>
              <div>Comment: {comment.comment}</div>
            </article>
          )}
        </section>
      </>
    );
  } else if (location.state) {
    return (
      <section className='post-container'>
        <Post post={location.state} />
      </section>
    );
  } else {
    return null;
  }
};

export default SinglePost;