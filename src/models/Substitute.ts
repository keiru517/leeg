import {
  Model,
  DataTypes,
  Optional,
  CreationOptional,
  ForeignKey
} from 'sequelize';
import sequelize from '.';
import { Types } from '../types';
import Match from './Match';

type SubstituteCreationAttribute = Optional<
  Types.T_Substitute,
  'id' | 'createdAt' | 'updatedAt'
>;

export default class Substitute extends Model<
  SubstituteCreationAttribute,
  SubstituteCreationAttribute
> {
  declare id: CreationOptional<number>;
  declare leagueId: ForeignKey<number>;
  declare matchId: ForeignKey<number>;
  declare teamId: ForeignKey<number>;
  declare firstName: string;
  declare lastName: string;
  declare jerseyNumber: number;
  declare position: string;
  declare totalPoints: number;
  declare totalPoints3: number;
  declare totalPoints2: number;
  declare totalPoints1: number;
  declare attempts3: number;
  declare attempts2: number;
  declare attempts1: number;
  declare blocks: number;
  declare rebounds: number;
  declare assists: number;
  declare fouls: number;
  declare steals: number;
  declare turnovers: number;
  declare attendance:boolean;
  declare isSubstitute: boolean;
  static modelName = 'Substitute';
}
Substitute.init(
  {
    leagueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'League',
        key: 'id'
      }
    },
    matchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Match',
        key: 'id'
      }
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Team',
        key: 'id'
      }
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    jerseyNumber: DataTypes.INTEGER,
    position: DataTypes.STRING,
    totalPoints: DataTypes.INTEGER,
    totalPoints3: DataTypes.INTEGER,
    totalPoints2: DataTypes.INTEGER,
    totalPoints1: DataTypes.INTEGER,
    attempts3: DataTypes.INTEGER,
    attempts2: DataTypes.INTEGER,
    attempts1: DataTypes.INTEGER,
    blocks: DataTypes.INTEGER,
    rebounds: DataTypes.INTEGER,
    assists: DataTypes.INTEGER,
    fouls: DataTypes.INTEGER,
    steals: DataTypes.INTEGER,
    turnovers: DataTypes.INTEGER,
    attendance:{
      type: DataTypes.INTEGER,
      defaultValue:1
    },
    isSubstitute: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    modelName: 'Substitute'
  }
);


Substitute.belongsTo(Match, {
  foreignKey: 'matchId',
  as: 'match'
});
