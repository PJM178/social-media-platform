import User from './user';
import Post from './post';
// import UserPosts from './user_posts';

User.hasMany(Post);
Post.belongsTo(User);

// User.belongsToMany(Post, { through: UserPosts, as: 'userposts' });
// Post.belongsToMany(User, { through: UserPosts, as: 'userposts' });

export {
  Post, User
};