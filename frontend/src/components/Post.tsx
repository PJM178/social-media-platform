import { PostProps } from '../types/post';

const Post = ({ post }: PostProps) => {
  return (
    // <article className='post'>
    <>
      <h4>Username: {post.user.username}</h4>
      <div>Title: {post.title}</div>
      <div>Content: {post.content}</div>
      <div>Likes: {post.likes}</div>
      {/* <LikingPost post={post} /> */}
    </>
    // </article>
  );
};

export default Post;