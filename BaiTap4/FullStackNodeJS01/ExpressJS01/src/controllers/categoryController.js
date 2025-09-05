// controllers/categoryController.js
import {
  createCategory, getAllCategories, getCategoryById,
  updateCategory, deleteCategory
} from '../services/categoryService.js';

export const createCategoryCtrl = async (req, res) => {
  const { name } = req.body;
  const category = await createCategory(name);
  res.json(category);
};

export const listCategoriesCtrl = async (_req, res) => {
  const categories = await getAllCategories();
  res.json(categories);
};

export const getCategoryCtrl = async (req, res) => {
  const category = await getCategoryById(req.params.id);
  if (!category) return res.status(404).json({ msg: 'Not found' });
  res.json(category);
};

export const updateCategoryCtrl = async (req, res) => {
  const category = await updateCategory(req.params.id, req.body.name);
  if (!category) return res.status(404).json({ msg: 'Not found' });
  res.json(category);
};

export const deleteCategoryCtrl = async (req, res) => {
  const success = await deleteCategory(req.params.id);
  if (!success) return res.status(404).json({ msg: 'Not found' });
  res.json({ msg: 'Deleted' });
};
