import User from './user';
import Post from './post';
// import UserPosts from './user_posts';
import LikedPost from './liked_posts';
import Session from './session';

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(LikedPost, { as: 'likedPosts' });
LikedPost.belongsTo(User);

// User.belongsToMany(Post, { through: UserPosts, as: 'userposts' });
// Post.belongsToMany(User, { through: UserPosts, as: 'userposts' });

export {
  Post, User, LikedPost, Session
};