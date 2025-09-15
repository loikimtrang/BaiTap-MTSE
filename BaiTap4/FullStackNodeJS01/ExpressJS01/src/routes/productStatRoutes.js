// routes/productStatRoutes.js
import express from 'express';
import { productCommentersCountCtrl } from '../controllers/productStatController.js';

const router = express.Router();

// API đếm số người đã bình luận trên sản phẩm
router.get('/:productId/commenters-count', productCommentersCountCtrl);

export default router;
