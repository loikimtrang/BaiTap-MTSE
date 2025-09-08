export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('Products', 'views', {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  });

  await queryInterface.addColumn('Products', 'hasDiscount', {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  });

}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('Products', 'views');
  await queryInterface.removeColumn('Products', 'hasDiscount');

}
