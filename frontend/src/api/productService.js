// src/api/productService.js
import axios from '../utils/axiosConfig';

export const getProducts = async (skip = 0, limit = 10, search = '') => {
  return axios.get(`/products?skip=${skip}&limit=${limit}&search=${search}`);
};

export const createProduct = async (productData) => {
  return axios.post('/products', productData);
};

export const updateProduct = async (id, productData) => {
  return axios.put(`/products/${id}`, productData);
};

export const deleteProduct = async (id) => {
  return axios.delete(`/products/${id}`);
};

export const productService = {
    getProduct: async (id) => {
      try {
        const response = await axios.get(`/products/${id}`);
        return response.data;
      } catch (error) {
        throw new Error('Échec de la récupération du produit');
      }
    }};