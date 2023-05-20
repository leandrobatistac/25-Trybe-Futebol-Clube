import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

class MatchModel extends Model {
  declare id: number;
  declare teamName: string;
}

MatchModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeamId: {
    allowNull: false,
    type: INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamId: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },
}, {
  tableName: 'matches',
  sequelize: db,
  timestamps: false,
  underscored: true,
});

export default MatchModel;
