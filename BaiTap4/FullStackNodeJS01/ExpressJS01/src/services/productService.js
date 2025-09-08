// services/productService.js
import db from '../models/index.js';
import esClient from '../utils/elasticsearch.js';
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

export const createProduct = async (data) => {
  const product = await Product.create(data);

  await esClient.index({
    index: 'products',
    id: product.id.toString(),
    document: product.toJSON(),
  });

  return product;
};

export const getProductById = (id) =>
  Product.findByPk(id, { include: [{ model: Category, attributes: ['name'] }] });

export const updateProduct = async (id, data) => {
  const product = await Product.findByPk(id);
  if (!product) return null;

  await product.update(data);

  await esClient.index({
    index: 'products',
    id: product.id.toString(),
    document: product.toJSON(),
  });

  return product;
};

export const deleteProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  await product.destroy();
  return true;
};
export const searchProductsFuzzy = async ({
  page = 1,
  limit = 12,
  search,
  categoryId,
  minPrice,
  maxPrice,
  hasDiscount,
  minViews,
  maxViews,
  sortBy = 'createdAt',
  order = 'desc',
}) => {
  const from = (page - 1) * limit;
  const must = [];
  const filter = [];

  if (search) {
    must.push({
      match: {
        name: {
          query: search,
          fuzziness: 'AUTO'
        }
      }
    });
  }

  if (categoryId) filter.push({ term: { categoryId } });
  if (typeof hasDiscount === 'boolean') filter.push({ term: { hasDiscount } });

  if (minPrice || maxPrice) {
    filter.push({
      range: {
        price: {
          gte: minPrice || 0,
          lte: maxPrice || 99999999
        }
      }
    });
  }

  if (minViews || maxViews) {
    filter.push({
      range: {
        views: {
          gte: minViews || 0,
          lte: maxViews || 99999999
        }
      }
    });
  }

  const result = await esClient.search({
    index: 'products',
    from,
    size: limit,
    sort: [`${sortBy}:${order}`],
    query: {
      bool: {
        must,
        filter
      }
    }
  });

  const total = result.hits.total.value;
  const data = result.hits.hits.map((hit) => hit._source);

  return {
    meta: {
      total,
      page,
      perPage: limit,
      totalPages: Math.ceil(total / limit),
      hasPrev: page > 1,
      hasNext: page * limit < total,
    },
    data
  };
};


export const syncAllProductsToElasticsearch = async () => {
  const products = await Product.findAll();
  const body = [];

  for (const product of products) {
    body.push({ index: { _index: 'products', _id: product.id.toString() } });
    body.push(product.toJSON());
  }

  if (body.length > 0) {
    const result = await esClient.bulk({ refresh: true, body });
    return { success: true, indexed: products.length, errors: result.errors };
  }

  return { success: true, indexed: 0 };
};
