import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { productsAPI, getImageURL } from '../api/config';
import ProductModal from '../components/ProductModal';
import Alert from '../components/Alert';

const AdminProducts = () => {
  const { user, hasPermission, isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Estado para alertas
  const [alert, setAlert] = useState({
    message: '',
    type: 'success',
    isVisible: false
  });

  const showAlert = (message, type = 'success') => {
    setAlert({
      message,
      type,
      isVisible: true
    });
  };

  const hideAlert = () => {
    setAlert(prev => ({ ...prev, isVisible: false }));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll();
      setProducts(response.data.data.productos || response.data.data || []);
    } catch (err) {
      setError('Error al cargar los productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (formData) => {
    try {
      await productsAPI.create(formData);
      setIsModalOpen(false);
      setSelectedProduct(null);
      fetchProducts();
      showAlert('Producto creado exitosamente', 'success');
    } catch (err) {
      showAlert(err.response?.data?.message || 'Error al crear el producto', 'error');
    }
  };

  const handleUpdateProduct = async (formData) => {
    try {
      await productsAPI.update(selectedProduct.id, formData);
      setIsModalOpen(false);
      setSelectedProduct(null);
      fetchProducts();
      showAlert('Producto actualizado exitosamente', 'success');
    } catch (err) {
      showAlert(err.response?.data?.message || 'Error al actualizar el producto', 'error');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!hasPermission('ELIMINAR_PRODUCTOS')) {
      showAlert('No tienes permisos para eliminar productos', 'warning');
      return;
    }

    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await productsAPI.delete(id);
        fetchProducts();
        showAlert('Producto eliminado exitosamente', 'success');
      } catch (err) {
        showAlert(err.response?.data?.message || 'Error al eliminar el producto', 'error');
      }
    }
  };

  const openCreateModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ'
    }).format(price);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px',
        color: '#64748b'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #e2e8f0', 
            borderTop: '4px solid #101e8d', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem auto'
          }}></div>
          <h3>Cargando productos...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        background: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '8px',
        padding: '2rem',
        textAlign: 'center',
        color: '#dc2626'
      }}>
        <svg style={{ width: '48px', height: '48px', margin: '0 auto 1rem auto' }} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <>
      {/* Header Actions */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '8px',
            background: '#101e8d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg style={{ width: '24px', height: '24px', color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h2 style={{ margin: 0, color: '#1f2937', fontSize: '1.5rem', fontWeight: '600' }}>
              Productos Registrados
            </h2>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
              {products.length} producto{products.length !== 1 ? 's' : ''} en total
            </p>
          </div>
        </div>
        
        {hasPermission('CREAR_PRODUCTOS') && (
          <button 
            onClick={openCreateModal}
            style={{
              background: '#101e8d',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#1e40af'}
            onMouseOut={(e) => e.target.style.background = '#101e8d'}
          >
            <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Crear Producto
          </button>
        )}
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {products.map((product) => (
            <div 
              key={product.id}
              style={{
                background: '#ffffff',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{ 
                height: '200px', 
                background: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {product.imagen ? (
                  <img 
                    src={getImageURL(product.imagen)}
                    alt={product.nombre}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div style={{ 
                  display: product.imagen ? 'none' : 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  height: '100%',
                  color: '#9ca3af'
                }}>
                  <svg style={{ width: '48px', height: '48px' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                
                {/* Stock Badge */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: product.inventario > 10 ? '#10b981' : product.inventario > 0 ? '#f59e0b' : '#ef4444',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {product.inventario} en stock
                </div>
              </div>
              
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ 
                  margin: '0 0 0.5rem 0', 
                  color: '#1f2937',
                  fontSize: '1.1rem',
                  fontWeight: '600'
                }}>
                  {product.nombre}
                </h3>
                
                <p style={{ 
                  margin: '0 0 1rem 0', 
                  color: '#6b7280',
                  fontSize: '0.9rem',
                  lineHeight: '1.4',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {product.descripcion}
                </p>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: '700',
                    color: '#1f2937'
                  }}>
                    {formatPrice(product.precio)}
                  </div>
                  <div style={{ 
                    color: '#6b7280',
                    fontSize: '0.8rem'
                  }}>
                    SKU: {product.sku}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div style={{ 
                  display: 'flex', 
                  gap: '0.5rem'
                }}>
                  {hasPermission('ACTUALIZAR_PRODUCTOS') && (
                    <button
                      onClick={() => openEditModal(product)}
                      style={{
                        flex: 1,
                        background: '#101e8d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.6rem',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'background 0.2s ease'
                      }}
                      onMouseOver={(e) => e.target.style.background = '#1e40af'}
                      onMouseOut={(e) => e.target.style.background = '#101e8d'}
                    >
                      <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.379-8.379-2.828-2.828z" />
                      </svg>
                      Editar
                    </button>
                  )}
                  {hasPermission('ELIMINAR_PRODUCTOS') && (
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      style={{
                        flex: 1,
                        background: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.6rem',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'background 0.2s ease'
                      }}
                      onMouseOver={(e) => e.target.style.background = '#b91c1c'}
                      onMouseOut={(e) => e.target.style.background = '#dc2626'}
                    >
                      <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v6a1 1 0 11-2 0V7zM12 7a1 1 0 012 0v6a1 1 0 11-2 0V7z" clipRule="evenodd" />
                      </svg>
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '3rem',
          textAlign: 'center'
        }}>
          <svg style={{ width: '64px', height: '64px', color: '#9ca3af', margin: '0 auto 1rem auto' }} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" clipRule="evenodd" />
          </svg>
          <h3 style={{ color: '#1f2937', marginBottom: '1rem' }}>
            No hay productos registrados
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            Comienza agregando tu primer producto al inventario
          </p>
          {hasPermission('CREAR_PRODUCTOS') && (
            <button 
              onClick={openCreateModal}
              style={{
                background: '#101e8d',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Crear Primer Producto
            </button>
          )}
        </div>
      )}

      {/* Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={selectedProduct ? handleUpdateProduct : handleCreateProduct}
      />

      {/* Alert Component */}
      <Alert
        message={alert.message}
        type={alert.type}
        isVisible={alert.isVisible}
        onClose={hideAlert}
      />
      
      {/* CSS Animation for Loading */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};

export default AdminProducts;
