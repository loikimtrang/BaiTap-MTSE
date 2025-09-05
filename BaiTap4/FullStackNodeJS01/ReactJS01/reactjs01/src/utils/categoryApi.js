import instance from './axios.customize';

/**
 * =====================
 * 📂 CATEGORY APIs
 * =====================
 */

// Tạo danh mục mới
export const createCategoryApi = (name) =>
  instance.post('/categories', { name });

// Cập nhật danh mục
export const updateCategoryApi = (id, name) =>
  instance.put(`/categories/${id}`, { name });

// Xoá danh mục
export const deleteCategoryApi = (id) =>
  instance.delete(`/categories/${id}`);

// Lấy tất cả danh mục
export const getCategoryListApi = () =>
  instance.get('/categories');

// Lấy 1 danh mục theo id
export const getCategoryByIdApi = (id) =>
  instance.get(`/categories/${id}`);
