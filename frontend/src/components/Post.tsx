import { PostProps } from '../types/post';

const Post = ({ post }: PostProps) => {
  return (
    <article className='post'>
      <div>{post.title}</div>
      <div>{post.content}</div>
    </article>
  );
};

export default Post;