import { Model, DataTypes, Optional, CreationOptional, ForeignKey } from 'sequelize';
import sequelize from '.';
import { Types } from '../types';

type PlayerCreationAttribute = Optional<
  Types.T_PLAYER,
  'id' | 'createdAt' | 'updatedAt'
>;

export default class Player extends Model<
  PlayerCreationAttribute,
  PlayerCreationAttribute
> {
  declare id: CreationOptional<number>;
  declare teamId: ForeignKey<number>;
  declare name: string;
  declare avatar: string;
  declare points: number;
  declare jerseyNumber: number;
  declare height: string;
  declare weight: string;
  declare country: string;
  declare age: number;
  declare birthDate: string;
  static modelName = 'Player';
}
Player.init(
  {
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Team',
        key: 'id'
      }
    },
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    points: DataTypes.INTEGER,
    jerseyNumber: DataTypes.INTEGER,
    height: DataTypes.STRING,
    weight: DataTypes.STRING,
    country: DataTypes.STRING,
    age: DataTypes.INTEGER,
    birthDate: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'Player'
  }
);
