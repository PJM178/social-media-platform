import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../utilities/db';

class Session extends Model {
  declare id: string;
  declare userId: number;
  declare userToken: string;
}

Session.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  userToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'session',
});

export default Session;