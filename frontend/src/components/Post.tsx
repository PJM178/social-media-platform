import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useUserInfo } from '../hooks/useUserInfo';
import { useMutation } from '@apollo/client';

import { PostProps, PostType } from '../types/post';

import LikingPost from './LikingPost';
import DislikeModal from './DislikeModal';
import { DELETE_POST } from '../mutations/post';

const Post = ({ post, delay }: PostProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [go, setGo] = useState<boolean>(false);
  const [clearTimer, setClearTimer] = useState<boolean>(true);
  const { username, userPosts } = useUserInfo();

  const [deletePost, { loading, data, error }] = useMutation(DELETE_POST, {
    onError: (error) => {
      console.log(error);
    },
  });

  const handleNavigate = (user: string, postId: number, post: PostType, e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log((e.target as Element).className);
    if ((e.target as Element).className !== 'liking-post-button-dislike' && (e.target as Element).className !== 'liking-post-button-like' && (e.target as Element).className !== 'delete-post-button') {
      if (Number(id) !== Number(postId)) {
        navigate(`/profile/${user}/${postId}`, { state: post });
      }
    }
  };

  const handleDeletePost = () => {
    deletePost({ variables: { id: Number(post.id) } });
  };
  console.log(post.id);

  return (
    <>
      <article onClick={(e) => handleNavigate(post.user.username, post.id, post, e)} className='post' key={post.id}>
        <h4>Username: {post.user.username}</h4>
        <div>Title: {post.title}</div>
        <div>Content: {post.content}</div>
        <div className='delete-post-button' onClick={() => handleDeletePost()} style={{ height: '10px', width: '20px', backgroundColor: 'green' }}></div>
        {post.user.username !== username && <LikingPost post={post} delay={delay} go={go} setGo={setGo} clearTimer={clearTimer} setClearTimer={setClearTimer} />}
      </article>
      {delay && go && !clearTimer && <DislikeModal setClearTimer={setClearTimer} />}
    </>
  );
};

export default Post;