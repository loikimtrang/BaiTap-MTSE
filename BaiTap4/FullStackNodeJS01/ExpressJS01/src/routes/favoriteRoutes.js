// routes/favoriteRoutes.js
import express from 'express';
import {
  addFavoriteCtrl,
  removeFavoriteCtrl,
  listFavoritesCtrl,
} from '../controllers/favoriteController.js';

const router = express.Router();

// GET: Lấy danh sách sản phẩm yêu thích của người dùng
router.get('/', listFavoritesCtrl);

// POST: Thêm sản phẩm vào danh sách yêu thích
router.post('/', addFavoriteCtrl);

// DELETE: Xoá sản phẩm khỏi danh sách yêu thích
router.delete('/:productId', removeFavoriteCtrl);

export default router;
