// controllers/productController.js
import {
  createProduct,
  getProductsPaged,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProductsFuzzy,
  syncAllProductsToElasticsearch,
  getSimilarProducts
} from '../services/productService.js';

import { buildApiResponse } from '../utils/responseBuilder.js';
export const listProductsCtrl = async (req, res) => {
  const { page, limit, categoryId, search, sortBy, order } = req.query;

  const { meta, data } = await getProductsPaged({
    page,
    limit,
    categoryId: categoryId ? Number(categoryId) : undefined,
    search,
    sortBy,
    order: (order || 'ASC').toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
  });

  const paginatedData = {
    items: data,
    totalItems: meta.total,
    totalPages: meta.totalPages,
    currentPage: meta.page,
    perPage: meta.perPage,
    hasNextPage: meta.hasNext,
    hasPrevPage: meta.hasPrev
  };

  return res.status(200).json(
    buildApiResponse({
      message: 'Lấy danh sách sản phẩm thành công',
      data: paginatedData,
      path: req.originalUrl,
      durationMs: Date.now() - req.startTime
    })
  );
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
export const searchProductsFuzzyCtrl = async (req, res) => {
  let {
    page,
    limit,
    keyword,
    search,
    categoryId,
    minPrice,
    maxPrice,
    hasDiscount,
    minViews,
    maxViews,
    sortBy,
    order,
  } = req.query;

  keyword = keyword || search;


  if (sortBy?.includes('_')) {
    const [field, direction] = sortBy.split('_');
    sortBy = field;
    order = direction;
  }

  const result = await searchProductsFuzzy({
    page: Number(page) || 1,
    limit: Number(limit) || 12,
    keyword,
    categoryId: categoryId ? Number(categoryId) : undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    hasDiscount:
      hasDiscount === 'true'
        ? true
        : hasDiscount === 'false'
          ? false
          : undefined,
    minViews: minViews ? Number(minViews) : undefined,
    maxViews: maxViews ? Number(maxViews) : undefined,
    sortBy,
    order,
  });

  return res.status(200).json(
    buildApiResponse({
      message: 'Tìm kiếm sản phẩm thành công (fuzzy search)',
      data: {
        items: result.data,
        ...result.meta,
      },
      path: req.originalUrl,
      durationMs: Date.now() - req.startTime,
    })
  );
};


/**
 * API: POST /products/sync-es
 */
export const syncAllProductsCtrl = async (req, res) => {
  const result = await syncAllProductsToElasticsearch();

  return res.json(
    buildApiResponse({
      message: 'Đồng bộ toàn bộ sản phẩm vào Elasticsearch thành công',
      data: result,
      path: req.originalUrl,
      durationMs: Date.now() - req.startTime,
    })
  );
};
export const similarProductsCtrl = async (req, res) => {
  const products = await getSimilarProducts(req.params.productId);
  res.json(products);
};
