import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class UserModel extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

UserModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  username: {
    allowNull: false,
    type: STRING(20),
  },
  role: {
    allowNull: false,
    type: STRING(20),
  },
  email: {
    allowNull: false,
    type: STRING(20),
  },
  password: {
    allowNull: false,
    type: STRING(20),
  },
}, {
  tableName: 'users',
  sequelize: db,
  timestamps: false,
  underscored: true,
});

export default UserModel;
