import { Sequelize } from 'sequelize';
import { sequelize } from '../config/database.js'; 

import UserModel from './user.js';
import PasswordResetModel from './passwordReset.js';

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = UserModel(sequelize, Sequelize.DataTypes);
db.PasswordReset = PasswordResetModel(sequelize, Sequelize.DataTypes);

export default db;
