import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Estado para controlar el scroll
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Array de mensajes rotativos
  const messages = [
    {
      text: "Envío gratis a todo el país en compras mayores a Q250.00",
      link: "#",
      linkText: "Ver restricciones"
    },
    {
      text: "¡Aprovecha nuestras ofertas especiales!",
      link: "#",
      linkText: "Ver ofertas"
    },
    {
      text: "30% de descuento con tarjetas Cuscatlán. Aplican restricciones.",
      link: "#",
      linkText: "Ver tiendas"
    },
    {
      text: "Todo para el regreso a clases a precios que te encantan.",
      link: "#",
      linkText: "Ver más"
    }
  ];

  const [currentMessage, setCurrentMessage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Effect para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 100); // Header se vuelve fijo después de 100px de scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => {
        const next = prev + 1;
        if (next >= messages.length) {
          // Cuando llegamos al final, hacemos una transición suave al inicio
          setTimeout(() => {
            setIsTransitioning(false);
            setCurrentMessage(0);
            setTimeout(() => {
              setIsTransitioning(true);
            }, 50);
          }, 500);
          return next;
        }
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      {/* Rotating message banner - solo se muestra cuando no está scrolled */}
      {!isScrolled && (
        <div className="header-message-banner">
          <div className="header-message-content">
            <div className="header-message-container">
              <div 
                className="header-message-slider"
                style={{
                  transform: `translateX(-${currentMessage * 100}%)`,
                  transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
                }}
              >
                {/* Duplicamos los mensajes para un loop infinito suave */}
                {[...messages, ...messages].map((message, index) => (
                  <div key={index} className="header-message-item">
                    {message.text}
                    <a href={message.link} className="header-message-link">
                      {message.linkText}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top bar - solo se muestra cuando no está scrolled */}
      {!isScrolled && (
        <div className="header-top-bar">
          <div className="header-top-container">
            <div className="header-top-nav">
              {/* Logos a la izquierda */}
              <div className="header-top-logos-left">
                <div className="header-logo-container">
                  <img 
                    src="/CemacoHome2IONew.png" 
                    alt="CEMACO" 
                    className="header-cemaco-logo-blue"
                    onError={(e) => {
                      console.error('Error loading Cemaco logo blue:', e);
                      e.target.style.display = 'none';
                    }}
                    onLoad={() => console.log('Cemaco logo blue loaded successfully')}
                  />
                </div>
                <div className="header-logo-container jugueton-logo-top-container">
                  <img 
                      src="/juguetonLogo.png" 
                      alt="Juguetón" 
                      className="header-jugueton-logo-top"
                      onError={(e) => {
                        console.error('Error loading Jugueton logo top:', e);
                        e.target.style.display = 'none';
                      }}
                      onLoad={() => console.log('Jugueton logo top loaded successfully')}
                  />
                </div>
              </div>

              {/* Enlaces de navegación a la derecha */}
              <div className="header-top-links">
                <a href="#" className="header-top-link">Productos con suscripción</a>
                <a href="#" className="header-top-link">¿Eres empresa?</a>
                <a href="#" className="header-top-link">Tiendas</a>
                <a href="#" className="header-top-link">Compra x chat</a>
                <a href="#" className="header-top-link">Compra X WhatsApp</a>
                {isAuthenticated && location.pathname !== '/' && (
                  <>
                    <span className="header-user-info">Hola, {user?.nombre} ({user?.rol?.nombre})</span>
                    <button onClick={logout} className="header-logout-btn">
                      Cerrar Sesión
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main header */}
      <header className={`header-main ${isScrolled ? 'header-main-fixed' : ''}`}>
        <div className="header-main-container">
          <div className="header-main-content">
            {/* Menú hamburguesa - visible en tablet/móvil */}

            {/* Logo CEMACO principal - cambia a logo.png cuando está scrolled */}
            <div className="header-logo-section">
                <div className="header-mobile-menu">
                <div className="header-hamburger-menu">
                    <svg className="header-hamburger-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                    </svg>
                </div>
                </div>
              {/* Logo principal */}
              <img 
                src={isScrolled ? "/logo.png" : "/CemacoHome2IONew.png"} 
                alt="CEMACO" 
                className={`header-cemaco-logo ${isScrolled ? 'header-cemaco-logo-scrolled' : ''}`}
                onError={(e) => {
                  console.error('Error loading Cemaco logo:', e);
                  e.target.style.display = 'none';
                }}
                onLoad={() => console.log('Cemaco logo loaded successfully')}
              />
              
              {/* Departamentos en versión desktop fixed/scrolled */}
              {isScrolled && (
                <div className="header-departments-fixed">
                  <span className="header-departments-text">Departamentos</span>
                  <svg className="header-departments-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="6,9 12,15 18,9"/>
                  </svg>
                </div>
              )}
            </div>

            {/* Search bar */}
            <div className="header-search-container">
              <input
                type="text"
                placeholder="Buscar"
                className="header-search-input"
              />
              <div className="header-search-icon">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </div>
            </div>

            {/* User actions */}
            <div className="header-user-actions">
              <div className="header-action-item">
                <svg className="header-action-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                {isAuthenticated && location.pathname !== '/' ? (
                  <a href="/admin" className="header-action-item">
                    Administración
                  </a>
                ) : (
                  <a href="/login" className="header-action-item">
                    Iniciar sesión
                  </a>
                )}
              </div>
              
              <div className="header-action-item">
                <svg className="header-action-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation bar */}
      <nav className="header-navigation">
        <div className="header-navigation-container">
          <div className="header-navigation-content">
            <div className="header-departments">
              <span>Departamentos</span>
              <svg className="header-departments-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="6,9 12,15 18,9"/>
              </svg>
            </div>
            
            <a href="#" className="header-nav-link">Bodas y registros</a>
            <a href="#" className="header-nav-link">Revistas</a>
            <a href="#" className="header-nav-link">Privilegio</a>
            
            <div className="header-services">
              <div className="header-service-item">
                <svg className="header-service-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16,8 20,8 23,11 23,16 16,16"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
                <span>Entrega rápida</span>
              </div>
              <div className="header-service-item">
                <svg className="header-service-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 21h18"/>
                  <path d="M5 21V7l8-4v18"/>
                  <path d="M19 21V11l-6-4"/>
                  <path d="M9 9v1"/>
                  <path d="M9 12v1"/>
                  <path d="M9 15v1"/>
                </svg>
                <span>Retira en tiendas</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Category navigation */}
      <div className="header-categories">
        <div className="header-categories-container">
          <div className="header-categories-content">
            <a href="#" className="header-category-link">Tecnología</a>
            <a href="#" className="header-category-link">Muebles</a>
            <a href="#" className="header-category-link">Novedades</a>
            <a href="#" className="header-category-link">Todo en Ferretería</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
