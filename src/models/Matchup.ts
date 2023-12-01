import {
  Model,
  DataTypes,
  Optional,
  CreationOptional,
  ForeignKey
} from 'sequelize';
import sequelize from '.';
import { Types } from '../types';
import Player from './Player';

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
  declare userId: ForeignKey<number>;
  declare leagueId: ForeignKey<number>;
  declare matchId: ForeignKey<number>;
  declare teamId: ForeignKey<number>;
  declare points: number;
  declare points3: number;
  declare points2: number;
  declare points1: number;
  declare attempts3: number;
  declare attempts2: number;
  declare attempts1: number;
  declare blocks: number;
  declare rebounds: number;
  declare assists: number;
  declare fouls: number;
  declare steals: number;
  declare turnovers: number;
  declare attendance:boolean;
  declare isDeleted: number;
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    leagueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'League',
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
    points3: DataTypes.INTEGER,
    points2: DataTypes.INTEGER,
    points1: DataTypes.INTEGER,
    attempts3: DataTypes.INTEGER,
    attempts2: DataTypes.INTEGER,
    attempts1: DataTypes.INTEGER,
    blocks: DataTypes.INTEGER,
    rebounds: DataTypes.INTEGER,
    assists: DataTypes.INTEGER,
    fouls: DataTypes.INTEGER,
    steals: DataTypes.INTEGER,
    turnovers: DataTypes.INTEGER,
    attendance:{
      type: DataTypes.INTEGER,
      defaultValue:1
    },
    isDeleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize,
    modelName: 'Matchup'
  }
);

Matchup.belongsTo(Player, {
  foreignKey: 'playerId',
  as: 'player'
});
