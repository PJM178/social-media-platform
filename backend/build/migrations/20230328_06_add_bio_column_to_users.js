import { DataTypes } from 'sequelize';
const up = async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'bio', {
        type: DataTypes.STRING,
    });
};
const down = async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'bio');
};
export { up, down };
