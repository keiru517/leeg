import { Model, DataTypes, Optional, CreationOptional } from 'sequelize';
import sequelize from '.';
import { Types } from '../types';
// import { DATE_TILE_FORMAT } from '../helpers';

type PlayerCreationAttribute = Optional<
  Types.T_Player,
  'id' | 'createdAt' | 'updatedAt'
>;

export default class Player extends Model<
  PlayerCreationAttribute,
  PlayerCreationAttribute
> {
  declare id: CreationOptional<number>;
  declare leagueId: number;
  declare teamId: number;
  declare userId: number;
  declare firstName: string;
  declare lastName: string;
  declare avatar: string;
  declare email: string;
  declare jerseyNumber: string;
  declare position: string;
  declare isWaitList: number;
  declare isAcceptedList: number;
  declare isDeleted: number
  declare isSubstitute: boolean
  static modelName = 'Player';
}
Player.init(
  {
    leagueId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    avatar: DataTypes.STRING,
    email: DataTypes.STRING,
    jerseyNumber: DataTypes.INTEGER,
    position: DataTypes.STRING,
    isWaitList: DataTypes.INTEGER,
    isAcceptedList: DataTypes.INTEGER,
    isDeleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isSubstitute: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    modelName: 'Player'
  }
);
