import { Model, DataTypes, Optional, CreationOptional, ForeignKey } from 'sequelize';
import sequelize from '.';
import { Types } from '../types';

type LeagueUserCreationAttributes = Optional<
  Types.T_LeagueUser,
  'id' | 'createdAt' | 'updatedAt'
>;

class LeagueUser extends Model<LeagueUserCreationAttributes, LeagueUserCreationAttributes> {
  declare id: CreationOptional<number>;
  declare leagueId: ForeignKey<number>;
  declare userId: ForeignKey<number>;
  declare isWaitList: boolean;
  declare isAcceptedList: boolean;

  static modelName = 'LeagueUser';
}

LeagueUser.init(
  {
    leagueId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    isWaitList: DataTypes.BOOLEAN,
    isAcceptedList: DataTypes.BOOLEAN,
  },
  {
    sequelize: sequelize,
    modelName: 'LeagueUser'
  }
);

export default LeagueUser;
