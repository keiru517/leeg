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
    matchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Match',
        key: 'id'
      }
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Team',
        key: 'id'
      }
    },
    points: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: 'Matchup'
  }
);
