import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../utilities/db';

class Blog extends Model {}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  author: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: new Date().getFullYear(),
    validate: {
      min: 1991,
      max: new Date().getFullYear(),
    },
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'blog',
});

export default Blog;