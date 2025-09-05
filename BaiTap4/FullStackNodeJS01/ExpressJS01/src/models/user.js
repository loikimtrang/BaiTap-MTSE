export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});
  return User;
};
