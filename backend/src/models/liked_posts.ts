import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../utilities/db';

class LikedPost extends Model {
  declare id: string;
  declare userId: number;
  declare postId: number;
}

LikedPost.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
    onDelete: 'CASCADE'
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'posts', key: 'id' },
    onDelete: 'CASCADE'
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'liked_post',
});

export default LikedPost;