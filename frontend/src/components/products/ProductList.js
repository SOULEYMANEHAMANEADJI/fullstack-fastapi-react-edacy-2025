// src/components/products/ProductList.js
import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, Form, Pagination } from 'react-bootstrap';
import axios from '../../utils/axiosConfig';
import ProductForm from './ProductForm';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const limit = 10;

  // Utilisation de useCallback pour mémoïser la fonction
  const fetchProducts = useCallback(async () => {
    const response = await axios.get(
      `/products?skip=${(page - 1) * limit}&search=${search}`
    );
    setProducts(response.data.items);
    setTotal(response.data.total);
  }, [page, search]); // Dépendances nécessaires

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // Maintenant fetchProducts est une dépendance stable

  const handleDelete = async (id) => {
    await axios.delete(`/products/${id}`);
    fetchProducts();
  }
  return (
    <div className="p-4">
      <div className="d-flex justify-content-between mb-4">
        <h2>Liste des Produits</h2>
        <Button onClick={() => setShowForm(true)}>Ajouter un produit</Button>
      </div>

      <Form.Control
        type="text"
        placeholder="Rechercher..."
        className="mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price} €</td>
              <td>{product.quantity}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowForm(true);
                  }}
                >
                  Modifier
                </Button>
                <Button variant="danger" onClick={() => handleDelete(product.id)}>
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        {[...Array(Math.ceil(total / limit)).keys()].map((number) => (
          <Pagination.Item
            key={number + 1}
            active={number + 1 === page}
            onClick={() => setPage(number + 1)}
          >
            {number + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      <ProductForm
        show={showForm}
        handleClose={() => {
          setShowForm(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        refreshProducts={fetchProducts}
      />
    </div>
  );
}