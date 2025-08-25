import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public address!: string;
  public gender!: boolean;
  public phoneNumber!: string;
  public roleId!: string;
}

User.init(
  {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    phoneNumber: DataTypes.STRING,
    roleId: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
  }
);

export default User;
