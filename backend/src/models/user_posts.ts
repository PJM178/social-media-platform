import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../utilities/db';

class UserPosts extends Model {
  declare id: string;
  declare userId: number;
  declare postId: number;
}

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
  modelName: 'user_post',
});

export default UserPosts;