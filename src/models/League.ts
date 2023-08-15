import { Model, DataTypes, Optional, CreationOptional } from 'sequelize';
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
  declare name: string;
  declare description: string;
  declare logo: string;
  declare startDate: string;
  declare endDate: string;
  static modelName = 'League';
}
League.init(
  {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    logo: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  },
  {
    sequelize,
    modelName: 'League'
  }
);
