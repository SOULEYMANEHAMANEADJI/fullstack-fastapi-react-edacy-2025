const API_BASE_URL = 'http://localhost:8000'; // Remplacez par l'URL de votre API

const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getProducts = async (skip = 0, limit = 10, search = '') => {
  const res = await fetch(`${API_BASE_URL}/products?skip=${skip}&limit=${limit}&search=${search}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || 'Failed to fetch products');
  }
  return res.json();
};

export const getProduct = async (id) => {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || `Failed to fetch product with id ${id}`);
  }
  return res.json();
};

export const createProduct = async (productData) => {
  const res = await fetch(`${API_BASE_URL}/products/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(productData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || 'Failed to create product');
  }
  return res.json();
};

export const updateProduct = async (id, productData) => {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(productData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || `Failed to update product with id ${id}`);
  }
  return res.json();
};

export const deleteProduct = async (id) => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || `Failed to delete product with id ${id}`);
    }
    return res.status === 204; // No content on successful delete
  };