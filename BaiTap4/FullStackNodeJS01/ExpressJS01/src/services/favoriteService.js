// services/favoriteService.js
import db from '../models/index.js';
const { Favorite, Product } = db;

export const addFavorite = async (userId, productId) => {
  return Favorite.findOrCreate({ where: { userId, productId } });
};

export const removeFavorite = async (userId, productId) => {
  return Favorite.destroy({ where: { userId, productId } });
};

export const getFavorites = async (userId) => {
  return Favorite.findAll({
    where: { userId },
    include: [{ model: Product }],
  });
};
