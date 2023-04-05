import User from './user';
import Post from './post';
// import UserPosts from './user_posts';
import LikedPost from './liked_posts';
import Session from './session';
import Comment from './comment';

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(LikedPost, { as: 'likedPosts' });
LikedPost.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

User.hasMany(Comment);
Comment.belongsTo(User);

// User.belongsToMany(Post, { through: UserPosts, as: 'userposts' });
// Post.belongsToMany(User, { through: UserPosts, as: 'userposts' });

User.belongsToMany(Post, { through: LikedPost, as: 'userLikedPosts' });
Post.belongsToMany(User, { through: LikedPost, as: 'usersliked' });

export {
  Post, User, LikedPost, Session, Comment
};