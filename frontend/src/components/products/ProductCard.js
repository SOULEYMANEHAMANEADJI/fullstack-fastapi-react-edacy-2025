// src/components/products/ProductCard.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          <strong>Prix:</strong> {product.price}€<br/>
          <strong>Quantité:</strong> {product.quantity}
        </Card.Text>
        <Button 
          as={Link} 
          to={`/products/${product.id}`} 
          variant="primary"
        >
          Voir détails
        </Button>
      </Card.Body>
    </Card>
  );
}