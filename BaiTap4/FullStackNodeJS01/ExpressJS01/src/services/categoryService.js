// services/categoryService.js
import db from '../models/index.js';
const { Category } = db;

export const createCategory = (name) => Category.create({ name });

export const getAllCategories = () => Category.findAll();

export const getCategoryById = (id) => Category.findByPk(id);

export const updateCategory = async (id, name) => {
  const category = await Category.findByPk(id);
  if (!category) return null;
  category.name = name;
  await category.save();
  return category;
};

export const deleteCategory = async (id) => {
  const category = await Category.findByPk(id);
  if (!category) return null;
  await category.destroy();
  return true;
};
