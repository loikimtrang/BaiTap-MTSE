// models/comment.js
export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Product, { foreignKey: 'productId' });
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Comment;
};
