// src/services/elasticsearchService.js
import esClient from '../utils/elasticsearch.js';

/**
 * Tìm kiếm sản phẩm với Elasticsearch
 */
export const searchProductsES = async ({
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
          fuzziness: 'AUTO' // fuzzy search
        }
      }
    });
  }

  if (categoryId) {
    filter.push({ term: { categoryId } });
  }

  if (typeof hasDiscount === 'boolean') {
    filter.push({ term: { hasDiscount } });
  }

  if (minPrice || maxPrice) {
    filter.push({
      range: {
        price: {
          gte: minPrice || 0,
          lte: maxPrice || 999999999
        }
      }
    });
  }

  if (minViews || maxViews) {
    filter.push({
      range: {
        views: {
          gte: minViews || 0,
          lte: maxViews || 999999999
        }
      }
    });
  }

  const response = await esClient.search({
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

  const hits = response.hits.hits.map((hit) => hit._source);
  const total = response.hits.total.value;

  return {
    meta: {
      total,
      page,
      perPage: limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
    data: hits
  };
};
