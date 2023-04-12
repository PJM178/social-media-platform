import { DataTypes } from 'sequelize';
import { Migration } from '../utilities/db';

const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable('liked_posts', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'posts', key: 'id' },
      onDelete: 'CASCADE',
    },
  });
};

const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('liked_posts');
};

export {
  up, down
};