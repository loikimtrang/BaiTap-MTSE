const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'node_fullstack',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  }
};
