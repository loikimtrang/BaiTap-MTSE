'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductViews', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: Sequelize.INTEGER, allowNull: false },
      productId: { type: Sequelize.INTEGER, allowNull: false },
      viewedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('ProductViews');
  },
};
