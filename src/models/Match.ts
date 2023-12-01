
import { Model, DataTypes, Optional, CreationOptional, ForeignKey} from 'sequelize';
import sequelize from '.';
import { Types } from '../types';

type MatchCreationAttribute = Optional<
  Types.T_Match,
  'id' | 'createdAt' | 'updatedAt'
>;

export default class Match extends Model<
  MatchCreationAttribute,
  MatchCreationAttribute
> {
  declare id: CreationOptional<number>;
  declare leagueId: ForeignKey<number>;
  declare homeTeamId: ForeignKey<number>;
  declare awayTeamId: ForeignKey<number>;
  declare date: string;
  declare time: string;
  declare location: string;
  declare homeTeamPoints: number;
  declare awayTeamPoints: number;
  declare isNew: boolean;
  declare isDeleted: number;
  static modelName = 'Match';
}
Match.init(
  {
    leagueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'League',
        key: 'id'
      }
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Team',
        key: 'id'
      }
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Team',
        key: 'id'
      }
    },
    date: DataTypes.STRING,
    time: DataTypes.STRING,
    location: DataTypes.STRING,
    period: {
      type:DataTypes.INTEGER,
      defaultValue:4,
    },
    timer: {
      type:DataTypes.INTEGER,
      defaultValue:20*6000,
    },
    homeTeamPoints: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    awayTeamPoints: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isNew: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }, 
    isDeleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize,
    modelName: 'Match'
  }
);