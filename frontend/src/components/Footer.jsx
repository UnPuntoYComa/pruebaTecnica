import React, { useState, useEffect } from 'react';
import SubscriptionSection from './SubscriptionSection';
import FooterTopItem from './FooterTopItem';
import FooterSection from './FooterSection';
import SocialIcon from './SocialIcon';
import '../styles/Footer.css';

const Footer = () => {
  const [openSections, setOpenSections] = useState({
    servicios: false,
    valores: false,
    ventaOnline: false,
    grupoCemaco: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Datos de las secciones
  const footerSections = [
    {
      key: 'servicios',
      title: 'Servicios',
      links: [
        { text: 'Instalaciones' },
        { text: 'Blog' },
        { text: 'Tiendas' },
        { text: 'Privilegio' },
        { text: 'Servicio a empresas' },
        { text: 'Bodas' },
        { text: 'Actividades' }
      ]
    },
    {
      key: 'valores',
      title: 'Nuestros valores',
      links: [
        { text: 'Sostenibilidad' },
        { text: 'Garantía total' },
        { text: 'Sistema B' }
      ]
    },
    {
      key: 'ventaOnline',
      title: 'Venta en línea',
      links: [
        { text: 'Retirar en tienda' },
        { text: 'Métodos de pago' },
        { text: 'Preguntas frecuentes' },
        { text: 'Descargar aplicación' }
      ]
    },
    {
      key: 'grupoCemaco',
      title: 'Grupo CEMACO',
      links: [
        { text: 'Únete a nuestro equipo' },
        { text: 'Sobre nosotros' },
        { text: 'Deseas ser proveedor' },
        { text: 'Juguetón' },
        { text: 'Bebé Juguetón' }
      ]
    }
  ];

  return (
    <footer className="footer">
      {/* Mobile Subscription Section - Solo visible en móvil, antes del top-bar */}
      <SubscriptionSection 
        className="footer-subscription-mobile-top" 
        containerClassName="footer-container" 
      />

      {/* Top Bar */}
      <div className="footer-top-bar">
        <div className="footer-top-container">
          <FooterTopItem icon="store" text="Tiendas" />
          <FooterTopItem icon="email" text="tusamigos@cemaco.com" />
          <FooterTopItem icon="whatsapp" text="Compra por WhatsApp" />
          <FooterTopItem icon="phone" text="(502) 2499-9990" />
          <FooterTopItem icon="chat" text="Chat en línea" />
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Footer Content */}
          <div className="footer-content">
            {/* Subscription Section - Mobile (dentro del contenido) */}
            <SubscriptionSection className="footer-subscription-mobile" />

            {/* Navigation Grid */}
            <div className="footer-grid-wrapper">
              <div className="footer-grid">
                {footerSections.map((section) => (
                  <FooterSection
                    key={section.key}
                    title={section.title}
                    sectionKey={section.key}
                    links={section.links}
                    isOpen={openSections[section.key]}
                    onToggle={toggleSection}
                  />
                ))}
              </div>
            </div>

            {/* Empresa Section */}
            <div className="footer-empresa-wrapper">                
              <div className="footer-empresa-top-row">
                <div className="footer-empresa-b">
                  <div className="footer-empresa-b-logo-container">
                    <img 
                      src="/empresaB.png" 
                      alt="Empresa B Certificada" 
                      className="footer-empresa-b-logo"
                    />
                  </div>
                  <div className="footer-empresa-b-content">
                    <p className="footer-empresa-b-text">
                      Somos una empresa B
                    </p>
                    <p className="footer-empresa-b-subtitle">
                      Estamos orgullosos de ser reconocidos por los más altos estándares de sostenibilidad social y ambiental.
                    </p>
                    <a href="#" className="footer-empresa-b-link">
                      Conoce más
                    </a>
                  </div>
                </div>

                {/* Opinions Section */}
                <div className="footer-opinions">
                  <div className="footer-opinions-container">
                    <img 
                      src="/opinionPlantilla.png" 
                      alt="Opiniones certificadas" 
                      className="footer-opinions-image"
                    />
                    <div className="footer-opinions-overlay">
                      <div className="footer-opinions-number">561K</div>
                      <div className="footer-opinions-stars">
                        <span>★★★★★</span>
                      </div>
                      <div className="footer-opinions-text">Opiniones</div>
                      <div className="footer-opinions-text">certificadas</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Subscription Section - Desktop */}
              <SubscriptionSection className="footer-subscription-desktop" />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-links">
            <a href="#" className="footer-bottom-link">Privacidad</a>
            <a href="#" className="footer-bottom-link">Términos y condiciones</a>
          </div>

          {/* Social Icons */}
          <div className="footer-social-icons">
            <SocialIcon network="tiktok" />
            <SocialIcon network="facebook" />
            <SocialIcon network="instagram" />
            <SocialIcon network="twitter" />
            <SocialIcon network="youtube" />
            <SocialIcon network="pinterest" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
