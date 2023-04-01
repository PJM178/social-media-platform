import { DataTypes } from 'sequelize';
const up = async ({ context: queryInterface }) => {
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
const down = async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'disabled');
    await queryInterface.removeColumn('users', 'admin');
};
export { up, down };
