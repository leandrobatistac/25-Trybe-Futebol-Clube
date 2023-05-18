import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class TeamModel extends Model {
  declare id: number;
  declare teamName: string;
}

TeamModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING(20),
  },
}, {
  tableName: 'teams',
  sequelize: db,
  timestamps: false,
  underscored: true,
});

export default TeamModel;
