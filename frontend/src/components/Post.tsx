import { useNavigate, useParams } from 'react-router-dom';

import { PostProps, PostType } from '../types/post';

import LikingPost from './LikingPost';

const Post = ({ post, delay }: PostProps) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleNavigate = (user: string, postId: number, post: PostType, e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log((e.target as Element).className);
    if ((e.target as Element).className !== 'liking-post-button-dislike' && (e.target as Element).className !== 'liking-post-button-like' && (e.target as Element).className !== 'modal-content-cancel') {
      if (Number(id) !== Number(postId)) {
        navigate(`/profile/${user}/${postId}`, { state: post });
      }
    }
  };

  return (
    <>
      <article onClick={(e) => handleNavigate(post.user.username, post.id, post, e)} className='post' key={post.id}>
        <h4>Username: {post.user.username}</h4>
        <div>Title: {post.title}</div>
        <div>Content: {post.content}</div>
        <LikingPost post={post} delay={delay} />
      </article>
    </>
  );
};

export default Post;