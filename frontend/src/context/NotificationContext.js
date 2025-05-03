// src/context/NotificationContext.js
import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'react-bootstrap';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success', duration = 5000) => {
    setNotification({ message, type });
    if (duration > 0) {
      setTimeout(() => setNotification(null), duration);
    }
  };

  const Notification = () => {
    if (!notification) return null;

    return (
      <div className="notification-container">
        <Alert 
          variant={notification.type} 
          onClose={() => setNotification(null)} 
          dismissible
          className="m-3"
        >
          {notification.message}
        </Alert>
      </div>
    );
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification />
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);