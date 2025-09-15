// routes/productViewRoutes.js
import express from 'express';
import {
  addViewHistoryCtrl,
  getViewHistoryCtrl,
} from '../controllers/productViewController.js';

const router = express.Router();

// Ghi nhận 1 sản phẩm đã được người dùng xem
router.post('/:productId/view', addViewHistoryCtrl);

// Lấy danh sách sản phẩm đã xem của người dùng
router.get('/view-history', getViewHistoryCtrl);

export default router;
