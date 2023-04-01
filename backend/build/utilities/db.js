import { Sequelize } from 'sequelize';
import { DATABASE_URL } from './config';
import { Umzug, SequelizeStorage } from 'umzug';
const sequelize = new Sequelize(DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});
const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        await runMigrations();
        console.log('Connected to the database');
    }
    catch (error) {
        console.log('Failed to connect to the database');
        console.log(error);
        return process.exit(1);
    }
    return null;
};
const umzug = new Umzug({
    migrations: { glob: './src/migrations/*.ts' },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    logger: console,
});
const runMigrations = async () => {
    const migrations = await umzug.up();
    console.log('Migrations up to date', {
        files: migrations.map((mig) => mig.name),
    });
};
export { connectToDatabase, sequelize, };
