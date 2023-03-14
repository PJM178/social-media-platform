import { DataTypes } from 'sequelize';
import { Migration } from '../utilities/db';

const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable('user_posts', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'posts', key: 'id' },
    },
  });
};

const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('user_posts');
};

export {
  up, down
};