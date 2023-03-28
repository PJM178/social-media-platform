import { DataTypes } from 'sequelize';
import { Migration } from '../utilities/db';

const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('users', 'bio', {
    type: DataTypes.STRING,
  });
};

const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('users', 'bio');
};

export {
  up, down
};