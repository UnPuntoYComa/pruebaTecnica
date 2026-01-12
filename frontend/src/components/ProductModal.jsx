import React, { useState, useEffect } from 'react';

const ProductModal = ({ product, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    sku: '',
    inventario: '',
    imagen: null
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre || '',
        descripcion: product.descripcion || '',
        precio: product.precio || '',
        sku: product.sku || '',
        inventario: product.inventario || '',
        imagen: null
      });
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        sku: '',
        inventario: '',
        imagen: null
      });
    }
    setErrors({});
  }, [product, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida';
    }

    if (!formData.precio || formData.precio <= 0) {
      newErrors.precio = 'El precio debe ser mayor a 0';
    }

    if (!formData.sku.trim()) {
      newErrors.sku = 'El SKU es requerido';
    }

    if (!formData.inventario || formData.inventario < 0) {
      newErrors.inventario = 'El inventario debe ser mayor o igual a 0';
    }

    if (!product && !formData.imagen) {
      newErrors.imagen = 'La imagen es requerida para productos nuevos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData = new FormData();
    submitData.append('nombre', formData.nombre);
    submitData.append('descripcion', formData.descripcion);
    submitData.append('precio', formData.precio);
    submitData.append('sku', formData.sku);
    submitData.append('inventario', formData.inventario);
    
    if (formData.imagen) {
      submitData.append('imagen', formData.imagen);
    }

    onSave(submitData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{product ? 'Editar Producto' : 'Crear Producto'}</h3>
          <button onClick={onClose} className="modal-close">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre del Producto</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingresa el nombre del producto"
            />
            {errors.nombre && <div className="error">{errors.nombre}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe el producto"
              rows="3"
              style={{ resize: 'vertical', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' }}
            />
            {errors.descripcion && <div className="error">{errors.descripcion}</div>}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="precio">Precio (GTQ)</label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
              {errors.precio && <div className="error">{errors.precio}</div>}
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="inventario">Inventario</label>
              <input
                type="number"
                id="inventario"
                name="inventario"
                value={formData.inventario}
                onChange={handleChange}
                placeholder="0"
                min="0"
              />
              {errors.inventario && <div className="error">{errors.inventario}</div>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="sku">SKU</label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              placeholder="Código único del producto"
            />
            {errors.sku && <div className="error">{errors.sku}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="imagen">Imagen del Producto</label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              onChange={handleChange}
              accept="image/*"
            />
            {errors.imagen && <div className="error">{errors.imagen}</div>}
            {product && !formData.imagen && (
              <small style={{ color: '#666', display: 'block', marginTop: '0.25rem' }}>
                Deja vacío para mantener la imagen actual
              </small>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn"
              style={{ flex: 1 }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              {product ? 'Actualizar' : 'Crear'} Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
