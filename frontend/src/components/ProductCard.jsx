import React from 'react';
import { getImageURL } from '../api/config';

const ProductCard = ({ 
  product, 
  isFavorite, 
  onToggleFavorite,
  formatPrice,
  className = "product-card" 
}) => {
  const { integer, decimal } = formatPrice(product.precio);

  return (
    <div className={className}>
      <div className="product-image">
        <button 
          className={`product-favorite ${isFavorite ? 'favorited' : ''}`}
          onClick={() => onToggleFavorite(product.id)}
          aria-label="Agregar a favoritos"
        >
          <svg viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        
        {product.imagen ? (
          <img 
            src={getImageURL(product.imagen)}
            alt={product.nombre}
            className="product-image-img"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="product-no-image">
          <svg style={{ width: '48px', height: '48px', color: '#9ca3af' }} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.nombre}</h3>
        
        <div className="product-price">
          <span className="product-price-currency">Q</span>
          <span>{integer}</span>
          <span className="product-price-decimal">{decimal}</span>
        </div>
        
        <div className="product-availability">
          {product.inventario > 0 ? 'Únicamente en tiendas' : 'Sin stock'}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
