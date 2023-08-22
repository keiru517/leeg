import { Model, DataTypes, Optional, CreationOptional, ForeignKey } from 'sequelize';
import sequelize from '.';
import { Types } from '../types';

type UserLeagueCreationAttributes = Optional<
  Types.T_UserLeague,
  'id' | 'createdAt' | 'updatedAt'
>;

export default class UserLeague extends Model<
UserLeagueCreationAttributes,
UserLeagueCreationAttributes
> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<number>;
  declare leagueId: ForeignKey<number>;
  declare role: number;
}
UserLeague.init(
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
    role: DataTypes.INTEGER
  },
  {
    sequelize,
    modelName: 'UserLeague'
  }
);
