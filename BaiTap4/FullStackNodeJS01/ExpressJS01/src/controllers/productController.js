// controllers/productController.js
import {
  createProduct,
  getProductsPaged,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../services/productService.js';

export const listProductsCtrl = async (req, res) => {
  const { page, limit, categoryId, search, sortBy, order } = req.query;
  const result = await getProductsPaged({
    page,
    limit,
    categoryId: categoryId ? Number(categoryId) : undefined,
    search,
    sortBy,
    order: (order || 'ASC').toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
  });
  return res.status(200).json(result);
};

export const createProductCtrl = async (req, res) => {
  const product = await createProduct(req.body);
  res.json(product);
};

export const getProductCtrl = async (req, res) => {
  const product = await getProductById(req.params.id);
  if (!product) return res.status(404).json({ msg: 'Not found' });
  res.json(product);
};

export const updateProductCtrl = async (req, res) => {
  const product = await updateProduct(req.params.id, req.body);
  if (!product) return res.status(404).json({ msg: 'Not found' });
  res.json(product);
};

export const deleteProductCtrl = async (req, res) => {
  const success = await deleteProduct(req.params.id);
  if (!success) return res.status(404).json({ msg: 'Not found' });
  res.json({ msg: 'Deleted' });
};
