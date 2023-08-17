import { Model, DataTypes, Optional, CreationOptional, INTEGER } from 'sequelize';
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
  declare name: string;
  declare logo: string;
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
    pts: DataTypes.INTEGER,
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
