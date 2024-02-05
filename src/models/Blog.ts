import {
  Model,
  DataTypes,
  Optional,
  CreationOptional,
  ForeignKey
} from 'sequelize';
import sequelize from '.';
import { Types } from '../types';

type BlogCreationAttributes = Optional<
  Types.T_Blog,
  'id' | 'createdAt' | 'updatedAt'
>;

export default class Blog extends Model<
  BlogCreationAttributes,
  BlogCreationAttributes
> {
  declare id: CreationOptional<number>;
  declare leagueId: ForeignKey<number>;
  declare userId: ForeignKey<number>;
  declare title: string;
  declare description: string;
}
Blog.init(
  {
    leagueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'League',
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
    title: {
      type: DataTypes.STRING(255),
    },
    description: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    modelName: 'Blog'
  }
);
