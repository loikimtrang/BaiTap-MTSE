// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class PasswordReset extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   PasswordReset.init({
//     userId: DataTypes.INTEGER,
//     token: DataTypes.STRING,
//     expiresAt: DataTypes.DATE
//   }, {
//     sequelize,
//     modelName: 'PasswordReset',
//   });
//   return PasswordReset;
// };

export default (sequelize, DataTypes) => {
  const PasswordReset = sequelize.define('PasswordReset', {
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING,
    expiresAt: DataTypes.DATE
  }, {});
  return PasswordReset;
};
