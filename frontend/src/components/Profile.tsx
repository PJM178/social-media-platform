import { useQuery } from '@apollo/client';
import { useState } from 'react';

import { USER_POSTS } from '../queries/post';
import { useUserInfo } from '../hooks/useUserInfo';
import { PostType } from '../types/post';
import Post from './Post';

const Profile = () => {
  const [displayCategory, setDisplayCategory] = useState<string>('posts');
  const { userId, username, name } = useUserInfo();
  const { loading, error, data } = useQuery(USER_POSTS, {
    fetchPolicy: 'cache-and-network',
    variables: { userId: Number(userId) }
  });

  console.log('user posts', loading, error, data);

  return (
    <>
      <section className='user-profile-container'>
        <div className='user-profile'>
          <div className='user-profile-main-container'>
            <div style={{ width: '50px', height: '50px' }}><img style={{ width: 'inherit', height: 'inherit' }} src="data:image/png;base64,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" /></div>
            <div className='user-profile-main-names'>
              <div className='user-profile-name'>{name}</div>
              <div className='user-profile-username grey-text-color'>{username}</div>
            </div>
          </div>
          <div className='user-profile-buttons'>
            <div>edit profile</div>
          </div>
          <div>
            <div className='user-profile-bio'>bio</div>
            <div className='user-profile-joined grey-text-color'>joined</div>
          </div>
          <div className='user-profile-posts-container'>
            <div className='user-profile-posts' onClick={() => setDisplayCategory('posts')}><div className='user-profile-posts-icon'>&#9993;</div>Posts</div>
            <div className='user-profile-posts' onClick={() => setDisplayCategory('likes')}><div className='user-profile-posts-icon' style={{ color: '#FF006F' }}>&#x2661;</div>Likes</div>
          </div>
        </div>
      </section>
      {displayCategory === 'posts' && <section className='post-container'>
        {data ? data.allPosts?.map((post: PostType) => (
          <article className='post' key={post.id}>
            <Post key={post.id} post={post} />
          </article>
        )) : null}
      </section>}
    </>
  );
};

export default Profile;