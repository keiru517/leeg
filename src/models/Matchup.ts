import { Model, DataTypes, Optional, CreationOptional, INTEGER } from 'sequelize';
import sequelize from '.';
import { Types } from '../types';

type MatchupCreationAttribute = Optional<
  Types.T_Matchup,
  'id' | 'createdAt' | 'updatedAt'
>;

export default class Matchup extends Model<
  MatchupCreationAttribute,
  MatchupCreationAttribute
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare logo: string;
  static modelName = 'Matchup';
}
Matchup.init(
  {
    playerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Player',
        key: 'id'
      }
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Team',
        key: 'id'
      }
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Team',
        key: 'id'
      }
    },
    date: DataTypes.STRING,
    ps: DataTypes.INTEGER,
    gp: DataTypes.INTEGER,
    ppg: DataTypes.FLOAT,
  },
  {
    sequelize,
    modelName: 'Matchup'
  }
);
