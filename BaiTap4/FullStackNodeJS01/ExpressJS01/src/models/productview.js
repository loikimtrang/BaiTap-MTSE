// models/productview.js
export default (sequelize, DataTypes) => {
  const ProductView = sequelize.define('ProductView', {
    viewedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });

  ProductView.associate = (models) => {
    ProductView.belongsTo(models.User, { foreignKey: 'userId' });
    ProductView.belongsTo(models.Product, { foreignKey: 'productId' });
  };

  return ProductView;
};
