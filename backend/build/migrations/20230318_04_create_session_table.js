import { DataTypes } from 'sequelize';
const up = async ({ context: queryInterface }) => {
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
const down = async ({ context: queryInterface }) => {
    await queryInterface.dropTable('sessions');
};
export { up, down };
