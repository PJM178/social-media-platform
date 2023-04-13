import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../utilities/db';

class Comment extends Model {
  declare id: string;
  declare comment: string;
  declare userId: number;
  declare postId: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {  
      notEmpty: true,
      len: [0, 500],
    }, 
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
    onDelete: 'CASCADE',
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'posts', key: 'id' },
    onDelete: 'CASCADE',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'comment',
});

export default Comment;