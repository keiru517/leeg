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

type LogCreationAttribute = Optional<
  Types.T_Log,
  'id' | 'createdAt' | 'updatedAt'
>;

export default class Log extends Model<
  LogCreationAttribute,
  LogCreationAttribute
> {
  declare id: CreationOptional<number>;
  declare playerId: ForeignKey<number>;
  declare leagueId: ForeignKey<number>;
  declare matchId: ForeignKey<number>;
  declare teamId: ForeignKey<number>;
  declare event: string;
  declare period: number;
  declare time: string;
  declare isDirect: boolean;
  static modelName = 'Log';
}
Log.init(
  {
    playerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Player',
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
    event: DataTypes.STRING,
    period: DataTypes.STRING,
    time: DataTypes.STRING,
    isDirect: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    modelName: 'Log'
  }
);

Log.belongsTo(Player, {
  foreignKey: 'playerId',
  as: 'player'
});
