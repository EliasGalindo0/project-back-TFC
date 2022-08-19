import { Model, INTEGER } from 'sequelize';
import db from '.';
import Teams from './teams';

class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
    field: 'home_team',
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
    field: 'home_team_goals',
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
    field: 'away_team',
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
    field: 'away_team_goals',
  },
  inProgress: {
    allowNull: false,
    type: INTEGER,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Teams.belongsTo(Matches, { foreignKey: 'homeTeam', as: 'homeTeam' });
Teams.belongsTo(Matches, { foreignKey: 'awayTeam', as: 'awayTeam' });

Matches.hasMany(Teams, { foreignKey: 'homeTeam', as: 'homeTeam' });
Matches.hasMany(Teams, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default Matches;
