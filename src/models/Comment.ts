import {
  Model,
  DataTypes,
  Optional,
  CreationOptional,
  ForeignKey
} from 'sequelize';
import sequelize from '.';
import { Types } from '../types';

type CommentCreationAttributes = Optional<
  Types.T_Comment,
  'id' | 'createdAt' | 'updatedAt'
>;

export default class Comment extends Model<
  CommentCreationAttributes,
  CommentCreationAttributes
> {
  declare id: CreationOptional<number>;
  declare parentId: ForeignKey<number>;
  declare userId: ForeignKey<number>;
  declare title: string;
  declare description: string;
}
Comment.init(
  {
    parentId: {
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
    isBlogComment: {
      type: DataTypes.BOOLEAN
    },
    description: {
      type: DataTypes.STRING(500),
    },
    likes: {
      type: DataTypes.INTEGER
    },
    dislikes: {
      type: DataTypes.INTEGER
    },
  },
  {
    sequelize,
    modelName: 'Comment'
  }
);
