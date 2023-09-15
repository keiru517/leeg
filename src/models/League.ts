import { Model, DataTypes, Optional, CreationOptional, ForeignKey } from 'sequelize';
import sequelize from '.';
import { Types } from '../types';

type LeagueCreationAttributes = Optional<
  Types.T_League,
  'id' | 'createdAt' | 'updatedAt'
>;

export default class League extends Model<
  LeagueCreationAttributes,
  LeagueCreationAttributes
> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<number>;
  declare name: string;
  declare description: string;
  declare logo: string;
  declare startDate: string;
  declare endDate: string;
  declare isWaitList: boolean;
  declare isAcceptedList: boolean;
  static modelName = 'League';
}
League.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    logo: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    isWaitList: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isAcceptedList: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  },
  {
    sequelize,
    modelName: 'League'
  }
);
