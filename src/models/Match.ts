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
  declare result: string;
  declare status: string;
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
    result: {
      type:DataTypes.STRING,
      defaultValue: '--'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  },
  {
    sequelize,
    modelName: 'Match'
  }
);
