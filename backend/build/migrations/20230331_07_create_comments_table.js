import { DataTypes } from 'sequelize';
const up = async ({ context: queryInterface }) => {
    await queryInterface.createTable('comments', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [0, 500],
            }
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
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });
};
const down = async ({ context: queryInterface }) => {
    await queryInterface.dropTable('comments');
};
export { up, down };
