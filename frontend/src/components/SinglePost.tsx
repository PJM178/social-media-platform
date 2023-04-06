import { useLocation } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { GET_SINGLE_POST } from '../queries/post';
import { SinglePostType } from '../types/post';

import Post from './Post';
import CommentForm from './CommentForm';

const SinglePost = () => {
  const location = useLocation();
  const { id, username } = useParams();
  console.log('id userid params', id, username);

  const { loading, data, error } = useQuery<SinglePostType>(GET_SINGLE_POST, {
    variables: { id: Number(id) },
    onError: (error) => {
      console.log(error);
    },
  });
  console.log('single post data', data);
  // console.log(location.state);
  if (!loading && data) {
    return (
      <>
        <section className='post-container'>
          <Post post={data.singlePost} />
        </section>
        <CommentForm post={data.singlePost} />
        <section className='post-container'>
          {data.singlePost.comments.map(comment =>
            <article key={Number(comment.id)} className='post'>
              <div >{comment.comment}</div>
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