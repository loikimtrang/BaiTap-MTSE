import express from 'express';
import { auth } from '../middleware/auth.js';
import { delay } from '../middleware/delay.js';

import {
  createCategoryCtrl,
  listCategoriesCtrl,
  getCategoryCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl
} from '../controllers/categoryController.js';

const router = express.Router();
router.all('*', delay(200));

// Danh mục sản phẩm
router.post('/',    auth, createCategoryCtrl);
router.get('/',     listCategoriesCtrl);
router.get('/:id',  getCategoryCtrl);
router.put('/:id',  auth, updateCategoryCtrl);
router.delete('/:id', auth, deleteCategoryCtrl);

export default router;
