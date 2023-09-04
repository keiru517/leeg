import { Model, DataTypes, Optional, CreationOptional } from 'sequelize';
import sequelize from '.';
import { Types } from '../types';

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
  declare name: string;
  declare email: string;
  declare avatar: string;
  declare points: number;
  declare jerseyNumber: number;
  declare height: string;
  declare weight: string;
  declare country: string;
  declare age: number;
  declare birthDate: string;
  declare role: number;
  static modelName = 'Player';
}
Player.init(
  {
    leagueId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    points: {
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    jerseyNumber: DataTypes.INTEGER,
    height: DataTypes.STRING,
    weight: DataTypes.STRING,
    country: DataTypes.STRING,
    age: DataTypes.INTEGER,
    birthDate: DataTypes.STRING,
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 0 // 0 is waitlist, 1 is accepted
    }
  },
  {
    sequelize,
    modelName: 'Player'
  }
);
