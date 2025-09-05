import { Sequelize } from 'sequelize';
import { sequelize } from '../config/database.js';

import UserModel from './user.js';
import PasswordResetModel from './passwordReset.js';
import ProductModel from './product.js';
import CategoryModel from './category.js';

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = UserModel(sequelize, Sequelize.DataTypes);
db.PasswordReset = PasswordResetModel(sequelize, Sequelize.DataTypes);
db.Product = ProductModel(sequelize, Sequelize.DataTypes);
db.Category = CategoryModel(sequelize, Sequelize.DataTypes);

Object.values(db).forEach((model) => {
  if (typeof model.associate === 'function') {
    model.associate(db);
  }
});

export { sequelize };
export default db;
