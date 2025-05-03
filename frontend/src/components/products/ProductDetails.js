// src/components/products/ProductDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spinner, Alert } from 'react-bootstrap';
import axios from '../../utils/axiosConfig';
import { useNotification } from '../../context/NotificationContext';

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        showNotification('Erreur lors du chargement du produit', 'danger');
        setError('Produit non trouvé');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [productId, showNotification]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      <Card>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            <strong>Prix:</strong> {product.price}€<br/>
            <strong>Quantité:</strong> {product.quantity}<br/>
            <strong>Description:</strong> {product.description}<br/>
            <strong>Statut:</strong> {product.status}<br/>
            <strong>Créé le:</strong> {new Date(product.created_at).toLocaleDateString()}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}