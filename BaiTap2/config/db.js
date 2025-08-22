import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('node_fullstack', 'root', '123456', {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectDB;
