// src/components/common/Loading.js
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default function Loading() {
  return (
    <div className="d-flex justify-content-center mt-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Chargement...</span>
      </Spinner>
    </div>
  );
}