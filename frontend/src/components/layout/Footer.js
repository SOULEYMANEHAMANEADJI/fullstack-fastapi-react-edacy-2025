// src/components/layout/Footer.js
import React from 'react';
import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="mt-5 py-3 bg-dark text-white">
      <Container>
        <p className="text-center mb-0">
          © 2025 Gestion Produits - Tous droits réservés
        </p>
      </Container>
    </footer>
  );
}