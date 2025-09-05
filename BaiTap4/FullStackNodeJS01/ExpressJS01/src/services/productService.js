// services/productService.js
import db from '../models/index.js';
const { Product, Category } = db;

/**
 * Lấy danh sách sản phẩm có phân trang + lọc/sort tùy chọn
 * @param {Object} opts
 * @param {number} opts.page - trang hiện tại (>=1)
 * @param {number} opts.limit - số item/trang
 * @param {number} [opts.categoryId] - lọc theo category
 * @param {string} [opts.search] - tìm theo tên
 * @param {string} [opts.sortBy] - cột sort (name|price|createdAt)
 * @param {'ASC'|'DESC'} [opts.order] - hướng sort
 */
export const getProductsPaged = async ({
  page = 1,
  limit = 12,
  categoryId,
  search,
  sortBy = 'id',
  order = 'ASC',
}) => {
  const p = Math.max(parseInt(page) || 1, 1);
  const l = Math.min(Math.max(parseInt(limit) || 12, 1), 100); // chặn 1..100
  const offset = (p - 1) * l;

  const where = {};
  if (categoryId) where.categoryId = categoryId;
  if (search) where.name = { [db.Sequelize.Op.like]: `%${search}%` };

  const { count, rows } = await Product.findAndCountAll({
    where,
    limit: l,
    offset,
    include: [{ model: Category, attributes: ['id', 'name'] }],
    order: [[sortBy, order]],
  });

  const totalPages = Math.ceil(count / l) || 1;

  return {
    meta: {
      total: count,
      page: p,
      perPage: l,
      totalPages,
      hasPrev: p > 1,
      hasNext: p < totalPages,
      prevPage: p > 1 ? p - 1 : null,
      nextPage: p < totalPages ? p + 1 : null,
    },
    data: rows,
  };
};

// Giữ lại các hàm cũ nếu bạn vẫn dùng nơi khác
export const createProduct = (data) => Product.create(data);
export const getProductById = (id) =>
  Product.findByPk(id, { include: [{ model: Category, attributes: ['name'] }] });
export const updateProduct = async (id, data) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  await product.update(data);
  return product;
};
export const deleteProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  await product.destroy();
  return true;
};
