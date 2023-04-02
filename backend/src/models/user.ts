import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../utilities/db';
import { LikedPost } from '../types/post';

class User extends Model {
  declare id: number;
  declare username: string;
  declare name: string;
  declare passwordHash: string;
  declare disabled: boolean;
  declare admin: boolean;
  declare bio: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare likedPosts?: LikedPost[] | [];
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 20],
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  disabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  bio: {
    type: DataTypes.STRING,
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
  modelName: 'user',
});

export default User;