import { Model, DataTypes, Optional, CreationOptional } from 'sequelize';
import sequelize from '.';
import { Types } from '../types';

type UserCreationAttributes = Optional<
  Types.T_User,
  'id' | 'createdAt' | 'updatedAt'
>;

class User extends Model<UserCreationAttributes, UserCreationAttributes> {
  declare id: CreationOptional<number>;
  declare avatar: string;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare birthday: string;
  declare country: string;
  declare state: string;
  declare city: string;
  declare address: string;
  declare zipCode: string;
  declare password: string;

  static modelName = 'User';
}

User.init(
  {
    avatar: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    zipCode: DataTypes.STRING,
  },
  {
    sequelize: sequelize,
    modelName: 'User'
  }
);

export default User;
