import { Model, DataTypes, Optional, CreationOptional, ForeignKey } from 'sequelize';
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
  declare playerId: ForeignKey<number>;
  declare homeTeamId: ForeignKey<number>;
  declare awayTeamId: ForeignKey<number>;
  declare date: string;
  declare points: number;
  declare gamesPlayed: number;
  declare ppg: number;
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
    points: DataTypes.INTEGER,
    gamesPlayed: DataTypes.INTEGER,
    ppg: DataTypes.FLOAT,
  },
  {
    sequelize,
    modelName: 'Matchup'
  }
);
