import express from 'express';
import { auth } from '../middleware/auth.js';
import { delay } from '../middleware/delay.js';

import {
  createProductCtrl,
  listProductsCtrl,
  getProductCtrl,
  updateProductCtrl,
  deleteProductCtrl,
  searchProductsFuzzyCtrl,
  syncAllProductsCtrl
} from '../controllers/productController.js';

const router = express.Router();
router.all('*', delay(200));

// Sản phẩm
router.post('/',     auth, createProductCtrl);
router.get('/',      listProductsCtrl);
router.get('/:id',   getProductCtrl);
router.put('/:id',   auth, updateProductCtrl);
router.delete('/:id', auth, deleteProductCtrl);
router.get('/search', searchProductsFuzzyCtrl); 
router.post('/sync-es', syncAllProductsCtrl);

export default router;
