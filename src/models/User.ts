import { Model, DataTypes, Optional, CreationOptional } from 'sequelize';
import sequelize from '.';
import { Types } from '../types';

type UserCreationAttributes = Optional<
  Types.T_User,
  'id' | 'createdAt' | 'updatedAt'
>;

class User extends Model<UserCreationAttributes, UserCreationAttributes> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  static modelName = 'User';
}

User.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: DataTypes.STRING
  },
  {
    sequelize: sequelize,
    modelName: 'User'
  }
);

export default User;
