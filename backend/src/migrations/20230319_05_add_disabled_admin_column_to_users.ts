import { DataTypes } from 'sequelize';
import { Migration } from '../utilities/db';

const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('users', 'disabled', {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  });
  await queryInterface.addColumn('users', 'admin', {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  });
};

const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('users', 'disabled');
  await queryInterface.removeColumn('users', 'admin');
};

export {
  up, down
};