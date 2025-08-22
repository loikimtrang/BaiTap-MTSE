import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('node_fullstack', 'student', '123456', {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false,
});

try {
  await sequelize.authenticate();
  console.log('✅ Connected successfully!');
} catch (error) {
  console.error('❌ Unable to connect:', error);
}
