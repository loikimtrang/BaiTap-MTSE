// services/statService.js
import db from '../models/index.js';

export const countCommentersOfProduct = async (productId) => {
  const result = await db.Comment.findAll({
    where: { productId },
    attributes: [[db.Sequelize.fn('DISTINCT', db.Sequelize.col('userId')), 'userId']],
  });
  return result.length;
};
