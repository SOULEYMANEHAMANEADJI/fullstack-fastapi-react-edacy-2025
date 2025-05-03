// src/components/layout/Notification.js
import React from 'react';
import { Alert } from 'react-bootstrap';
import { useNotification } from '../../context/NotificationContext';

export default function Notification() {
  const { notification, clearNotification } = useNotification();

  if (!notification) return null;

  return (
    <div className="notification-container">
      <Alert 
        variant={notification.type} 
        onClose={clearNotification} 
        dismissible
        className="m-3"
      >
        {notification.message}
      </Alert>
    </div>
  );
}