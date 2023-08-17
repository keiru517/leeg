import { Model, DataTypes, Optional, CreationOptional, INTEGER } from 'sequelize';
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
  declare name: string;
  declare logo: string;
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
    result: DataTypes.STRING,
    status: DataTypes.STRING
  },
  {
    sequelize,
    modelName: 'Match'
  }
);
