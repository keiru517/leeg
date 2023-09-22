import {
  Model,
  DataTypes,
  Optional,
  CreationOptional,
  ForeignKey
} from 'sequelize';
import sequelize from '.';
import { Types } from '../types';

type AdminCreationAttributes = Optional<
  Types.T_Admin,
  'id' | 'createdAt' | 'updatedAt'
>;

export default class Admin extends Model<
  AdminCreationAttributes,
  AdminCreationAttributes
> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<number>;
  declare leagueId: ForeignKey<number>;
  declare role: number;
}
Admin.init(
  {
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
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    isDeleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize,
    modelName: 'Admin'
  }
);
