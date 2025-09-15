// models/favorite.js
export default (sequelize, DataTypes) => {
    const Favorite = sequelize.define('Favorite', {}, {});
    Favorite.associate = (models) => {
        Favorite.belongsTo(models.User, { foreignKey: 'userId' });
        Favorite.belongsTo(models.Product, { foreignKey: 'productId' });
    };
    return Favorite;
};
