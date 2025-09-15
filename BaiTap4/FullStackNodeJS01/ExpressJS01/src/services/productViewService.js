// services/productViewService.js
import db from '../models/index.js';
const { ProductView, Product, User } = db;

export const addViewHistory = async (userId, productId) => {
  return ProductView.create({ userId, productId });
};

export const getViewHistory = async (userId, limit = 20) => {
  return ProductView.findAll({
    where: { userId },
    include: [{ model: Product }],
    order: [['viewedAt', 'DESC']],
    limit,
  });
};
