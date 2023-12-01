import {
  Model,
  DataTypes,
  Optional,
  CreationOptional,
  ForeignKey
} from 'sequelize';
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
  declare sport: string;
  declare name: string;
  declare description: string;
  declare type: number;
  declare logo: string;
  declare startDate: string;
  declare endDate: string;
  declare minute: number;
  declare second: number;
  declare isAllowedFan: boolean;
  declare requirePassword: boolean;
  declare displayPosition: boolean;
  declare displayAttempts3: boolean;
  declare displayAttempts2: boolean;
  declare displayAttempts1: boolean;
  declare displayBlocks: boolean;
  declare displayRebounds: boolean;
  declare displayAssists: boolean;
  declare displayFouls: boolean;
  declare displaySteals: boolean;
  declare displayTurnovers: boolean;
  declare password: string;
  declare isDeleted: string;
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
    sport: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    name: {
      type: DataTypes.STRING(255)
    },
    description: {
      type:DataTypes.STRING(500)
    },
    logo: DataTypes.STRING,
    startDate: {
      type: DataTypes.STRING,
      defaultValue: 'N/A'
    },
    endDate: {
      type: DataTypes.STRING,
      defaultValue: 'N/A'
    },
    isAllowedFan: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    minute: {
      type: DataTypes.INTEGER
    },
    second: {
      type: DataTypes.INTEGER
    },
    displayPosition: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    displayAttempts3: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    displayAttempts2: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    displayAttempts1: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    displayBlocks: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    displayRebounds: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    displayAssists: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    displayFouls: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    displaySteals: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    displayTurnovers: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    requirePassword: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    password: {
      type: DataTypes.STRING
    },
    isDeleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize,
    modelName: 'League'
  }
);
