// models/orderitem.js
export default (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    productId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  });

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Product, { foreignKey: 'productId' });
    OrderItem.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return OrderItem;
};
