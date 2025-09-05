import express from 'express';
import { auth } from '../middleware/auth.js';
import { delay } from '../middleware/delay.js';

import {
  createProductCtrl,
  listProductsCtrl,
  getProductCtrl,
  updateProductCtrl,
  deleteProductCtrl
} from '../controllers/productController.js';

const router = express.Router();
router.all('*', delay(200));

// Sản phẩm
router.post('/',     auth, createProductCtrl);
router.get('/',      listProductsCtrl);
router.get('/:id',   getProductCtrl);
router.put('/:id',   auth, updateProductCtrl);
router.delete('/:id', auth, deleteProductCtrl);

export default router;
