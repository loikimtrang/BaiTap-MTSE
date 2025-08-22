import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here if needed
    }
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
  return User;
};
