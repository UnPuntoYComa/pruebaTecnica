import React from 'react';
import { useAuth } from '../auth/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="main-content">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h2>Cargando...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = '/login';
    return null;
  }

  return children;
};

export default ProtectedRoute;
