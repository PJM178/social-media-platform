import { PostProps } from '../types/post';

const Post = ({ post }: PostProps) => {
  return (
    <article className='post'>
      <h4>Username: {post.user.username}</h4>
      <div>Title: {post.title}</div>
      <div>Content: {post.content}</div>
      <div>Likes: {post.likes}</div>
      <div style={{ color: '#FF006F' }}>	&#x2661;</div>
      <div style={{ color: '#FF006F' }}>	&#9829;</div>
    </article>
  );
};

export default Post;