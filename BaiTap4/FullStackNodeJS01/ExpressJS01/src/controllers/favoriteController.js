// controllers/favoriteController.js
import { addFavorite, removeFavorite, getFavorites } from '../services/favoriteService.js';

export const addFavoriteCtrl = async (req, res) => {
  const { productId } = req.body;
  const [fav] = await addFavorite(req.user.id, productId);
  res.json({ msg: 'Added to favorites', data: fav });
};

export const removeFavoriteCtrl = async (req, res) => {
  await removeFavorite(req.user.id, req.params.productId);
  res.json({ msg: 'Removed from favorites' });
};

export const listFavoritesCtrl = async (req, res) => {
  const favs = await getFavorites(req.user.id);
  res.json(favs);
};
