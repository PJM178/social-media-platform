import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../utilities/db';

class UserPosts extends Model {}

UserPosts.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'posts', key: 'id' },
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user_posts',
});

export default UserPosts;