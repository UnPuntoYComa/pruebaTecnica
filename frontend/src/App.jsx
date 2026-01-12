import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import AuthLayout from './components/AuthLayout';
import Login from './pages/Login';
import PublicProducts from './pages/PublicProducts';
import AdminProducts from './pages/AdminProducts';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes with full layout */}
          <Route path="/" element={
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header />
              <PublicProducts />
              <Footer />
            </div>
          } />
          
          {/* Login with auth layout */}
          <Route path="/login" element={
            <AuthLayout title="Iniciar Sesión">
              <Login />
            </AuthLayout>
          } />
          
          {/* Admin routes with admin layout */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminLayout title="Gestión de Productos">
                  <AdminProducts />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;