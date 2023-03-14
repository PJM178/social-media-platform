import { PostProps } from '../types/post';

const Post = ({ post }: PostProps) => {
  return (
    <article className='post'>
      <h4>{post.user.username}</h4>
      <div>{post.title}</div>
      <div>{post.content}</div>
    </article>
  );
};

export default Post;