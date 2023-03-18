import { DataTypes } from 'sequelize';
import { Migration } from '../utilities/db';

const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable('sessions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    user_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('sessions');
};

export {
  up, down
};