import React from 'react';

const AuthLayout = ({ children, title = "Sistema de Administración" }) => {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#ffffff',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Auth Header */}
      <header style={{
        background: '#101e8d',
        color: 'white',
        padding: '12px 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <img 
              src="/CemacoHome2IONew.png" 
              alt="CEMACO" 
              style={{ 
                height: '40px',
                maxWidth: '120px',
                objectFit: 'contain',
                display: 'block'
              }}
            />
            
            <div style={{
              borderLeft: '2px solid rgba(255,255,255,0.3)',
              paddingLeft: '20px'
            }}>
              <h1 style={{
                margin: 0,
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: '600'
              }}>
                {title}
              </h1>
              <p style={{
                margin: '0.25rem 0 0 0',
                color: '#cbd5e1',
                fontSize: '0.9rem'
              }}>
                Sistema de gestión de productos
              </p>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <a 
              href="/" 
              style={{
                color: '#cbd5e1',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
            >
              Volver a la tienda
            </a>
          </div>
        </div>
      </header>

      {/* Content */}
      <main style={{
        padding: '2rem 0',
        minHeight: 'calc(100vh - 100px)',
        background: '#ffffff'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
