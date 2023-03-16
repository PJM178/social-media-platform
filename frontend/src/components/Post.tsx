import { PostProps } from '../types/post';

const Post = ({ post, user }: PostProps) => {
  console.log(user.likedPosts.some(likedPost => likedPost.postId === post.id));

  return (
    <article className='post'>
      <h4>Username: {post.user.username}</h4>
      <div>Title: {post.title}</div>
      <div>Content: {post.content}</div>
      <div>Likes: {post.likes}</div>
      {user.likedPosts.some(likedPost => likedPost.postId === Number(post.id))
        ? <div style={{ color: '#FF006F' }}>&#9829;</div>
        : <div style={{ color: '#FF006F' }}>&#x2661;</div>
      }
    </article>
  );
};

export default Post;