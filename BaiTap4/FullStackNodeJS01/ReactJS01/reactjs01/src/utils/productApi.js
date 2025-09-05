import instance from './axios.customize';

/**
 * =====================
 * 📦 PRODUCT APIs
 * =====================
 */

// Tạo sản phẩm mới
export const createProductApi = (product) =>
  instance.post('/products', product);

// Cập nhật sản phẩm
export const updateProductApi = (id, product) =>
  instance.put(`/products/${id}`, product);

// Xoá sản phẩm
export const deleteProductApi = (id) =>
  instance.delete(`/products/${id}`);

// Lấy 1 sản phẩm theo id
export const getProductByIdApi = (id) =>
  instance.get(`/products/${id}`);

// Lấy danh sách sản phẩm (có phân trang, lọc, tìm kiếm)
export const getProductListApi = (params) =>
  instance.get('/products', { params });

// Lấy danh sách sản phẩm theo danh mục (RESTful)
export const getProductsByCategoryApi = (categoryId, params = {}) =>
  instance.get(`/categories/${categoryId}/products`, { params });
