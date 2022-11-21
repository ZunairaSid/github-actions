import { Category } from '../../model/category';
import { fullUrl } from '../api';

const categoryRoute = '/api/order';

const CategoryAPI = Object.freeze({
  createCategory: (category: Category) => createCategory(category),
  deleteCategory: (id: number) => deleteCategory(id),
  updateCategory: (id: number, category: Category) =>
    updateCategory(id, category),
  getCategory: (id: number) => getCategory(id),
  getAllCategories: () => getAllCategories(),
});

// API are not yet tested

const createCategory = (category: Category) =>
  fetch(`${fullUrl}${categoryRoute}/createCategory`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });

const updateCategory = (id: number, category: Category) =>
  fetch(`${fullUrl}${categoryRoute}/updateCategory/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ category: category, id: id }),
  });

const deleteCategory = (id: number) =>
  fetch(`${fullUrl}${categoryRoute}/deleteCategory/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'text/plain',
    },
    body: JSON.stringify({ id }),
  });

const getCategory = (id: number) =>
  fetch(`${fullUrl}${categoryRoute}/getCategory/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'text/plain',
    },
  });
const getAllCategories = () =>
  fetch(`${fullUrl}${categoryRoute}/getCategory`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'text/plain',
    },
  });

export default CategoryAPI;
