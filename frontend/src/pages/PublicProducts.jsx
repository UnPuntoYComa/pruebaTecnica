import React, { useState, useEffect } from 'react';
import { productsAPI } from '../api/config';
import ProductCard from '../components/ProductCard';

const PublicProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const response = await productsAPI.getPublic();
        if (isMounted) {
          setProducts(response.data.data);
        }
      } catch (err) {
        if (isMounted) {
          // No mostrar error, solo dejar productos vacío
          console.error('Error al cargar productos:', err);
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatPrice = (price) => {
    const formatted = new Intl.NumberFormat('es-GT', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
    
    // Dividir precio en parte entera y decimal
    const [integer, decimal] = formatted.split('.');
    return { integer, decimal };
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  if (loading) {
    return (
      <div className="main-content">
        <div className="container">
          <div className="loading-state">
            <h2>Cargando productos...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="container">
        <div className="products-section">
          <h1 className="section-title">Productos</h1>
          
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.has(product.id)}
                onToggleFavorite={toggleFavorite}
                formatPrice={formatPrice}
              />
            ))}
          </div>
          
          {products.length === 0 && (
            <div className="no-products">
              <h3>No hay productos disponibles en este momento</h3>
              <p>Vuelve pronto para ver nuestras nuevas ofertas</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicProducts;
