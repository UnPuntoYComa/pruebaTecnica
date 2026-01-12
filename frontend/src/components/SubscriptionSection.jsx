import React from 'react';

const SubscriptionSection = ({ className = "", containerClassName = "" }) => {
  return (
    <div className={`footer-subscription ${className}`}>
      <div className={containerClassName}>
        <h4 className="footer-subscription-title">Suscríbete</h4>
        <p className="footer-subscription-text">
          Recibe ofertas, beneficios y noticias
        </p>
        <div className="footer-subscription-form">
          <input 
            type="email" 
            placeholder=""
            className="footer-subscription-input"
          />
          <button className="footer-subscription-button">
            SUSCRIBIRME
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSection;
