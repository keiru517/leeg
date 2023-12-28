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
  declare matchId: number;
  declare userId: number;
  declare firstName: string;
  declare lastName: string;
  declare avatar: string;
  declare email: string;
  declare jerseyNumber: string;
  declare position: string;
  declare birthday: string;
  declare country: string;
  declare state: string;
  declare city: string;
  declare address: string;
  declare zipCode: string;
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
    matchId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    avatar: DataTypes.STRING,
    email: DataTypes.STRING,
    jerseyNumber: DataTypes.INTEGER,
    position: DataTypes.STRING,
    birthday: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    zipCode: DataTypes.STRING,
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
