import { Sequelize } from 'sequelize';
import { DATABASE_URL } from './config';

const sequelize = new Sequelize(DATABASE_URL as never, {
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
    console.log('Connected to the database');
  } catch (error) {
    console.log('Failed to connect to the database');
    console.log(error);
    return process.exit(1);
  }

  return null;
};

export {
  connectToDatabase, sequelize,
};