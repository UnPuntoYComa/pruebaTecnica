import React from 'react';
import { useAuth } from '../auth/AuthContext';
import '../styles/Header.css';

const AdminLayout = ({ children, title = "Panel de Administración" }) => {
  const { user, logout } = useAuth();

  return (
    <div className="admin-layout">
      {/* Admin Header */}
      <header className="admin-header">
        <div className="admin-header-container">
          <div className="admin-header-left">
            <img 
              src="/CemacoHome2IONew.png" 
              alt="CEMACO" 
              className="admin-logo"
            />
            
            <div className="admin-title-section">
              <h1 className="admin-title">
                {title}
              </h1>
              <p className="admin-subtitle">
                Sistema de gestión de productos
              </p>
            </div>
          </div>
          
          <div className="admin-header-right">
            <div className="admin-user-info">
              <span className="admin-user-name">
                {user?.nombre}
              </span>
              <span className="admin-user-role">
                {user?.rol?.nombre}
              </span>
            </div>
            
            <div className="admin-user-avatar">
              {user?.nombre?.charAt(0)?.toUpperCase()}
            </div>
            
            <div className="admin-actions">
              <a href="/" className="admin-link">
                Ver tienda
              </a>
              <button onClick={logout} className="admin-logout-btn">
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="admin-content">
        <div className="admin-content-container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
