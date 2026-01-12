import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({
    correo: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();

  // Redirigir al panel si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/admin';
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(credentials);
    
    if (result.success) {
      window.location.href = '/admin';
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="main-content">
      <div className="container">
        <div className="login-container">
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#003366' }}>
            Iniciar Sesión
          </h2>
          
          <div style={{ 
            background: '#f8f9fa', 
            padding: '1rem', 
            borderRadius: '4px', 
            marginBottom: '2rem',
            fontSize: '0.9rem'
          }}>
            <strong>Usuarios de prueba:</strong><br/>
            <strong>Administrador:</strong> admin@test.com / admin123<br/>
            <strong>Colaborador:</strong> colaborador@test.com / colaborador123
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="correo">Correo Electrónico</label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={credentials.correo}
                onChange={handleChange}
                required
                placeholder="ejemplo@correo.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="error">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%', padding: '1rem' }}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
