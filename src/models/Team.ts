import { Model, DataTypes, Optional, CreationOptional, ForeignKey } from 'sequelize';
import sequelize from '.';
import { Types } from '../types';

type TeamCreationAttribute = Optional<
  Types.T_Team,
  'id' | 'createdAt' | 'updatedAt'
>;

export default class Team extends Model<
  TeamCreationAttribute,
  TeamCreationAttribute
> {
  declare id: CreationOptional<number>;
  declare teamId: ForeignKey<number>;
  declare name: string;
  declare logo: string;
  declare position: number;
  declare max: number;
  declare min: number;

  static modelName = 'Team';
}
Team.init(
  {
    leagueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'League',
        key: 'id'
      }
    },
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    position: DataTypes.INTEGER,
    max: DataTypes.INTEGER,
    min: DataTypes.INTEGER
  },
  {
    sequelize,
    modelName: 'Team'
  }
);
