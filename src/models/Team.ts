import {
  Model,
  DataTypes,
  Optional,
  CreationOptional,
  ForeignKey
} from 'sequelize';
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
  declare leagueId: ForeignKey<number>;
  declare name: string;
  declare logo: string;
  declare position: number;
  declare max: number;
  declare min: number;
  declare waitlist: number;
  declare win: number;
  declare lose: number;
  declare pointScored: number;
  declare pointAgainst: number;
  declare diff: number;
  declare isDeleted: number;

  static modelName = 'Team';
}
Team.init(
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
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    position: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    max: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    min: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    waitlist: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    win: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    lose: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    pointScored: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    pointAgainst: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    diff: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isDeleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize,
    modelName: 'Team'
  }
);
