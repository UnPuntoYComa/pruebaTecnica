# Prueba Técnica E-commerce

Sistema completo de e-commerce con backend API REST y frontend React, replicando la experiencia visual de Cemaco.com


� Índice

- [✨ Características](#-características)
- [🚀 Setup Rápido](#-setup-rápido)
  - [Con Docker (Recomendado)](#con-docker-recomendado)
  - [Sin Docker (Desarrollo)](#sin-docker-desarrollo)
- [🔑 Usuarios de Prueba](#-usuarios-de-prueba)
- [�️ Decisiones Técnicas](#️-decisiones-técnicas)
- [🏗️ Arquitectura](#️-arquitectura)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔧 API Endpoints](#-api-endpoints)
- [🐳 Comandos Docker](#-comandos-docker)

## ✨ Características

### 🔐 Seguridad
- Autenticación JWT con tokens seguros
- Contraseñas encriptadas con bcrypt
- Prevención de inyección SQL con Sequelize ORM
- Sistema de roles y permisos granular
- Middleware de autorización completo

### � Frontend
- Réplica exacta del diseño de Cemaco.com
- Header responsivo con logo dinámico al hacer scroll
- Footer con acordeón móvil y componentes reutilizables
- Panel administrativo
- Arquitectura de componentes escalable

### �️ Backend
- API REST con arquitectura MVC
- Gestión de imágenes optimizada en servidor
- Docker containerization para despliegue fácil
- Seeders automáticos para datos de prueba
- Validación de datos robusta

## 🚀 Setup Rápido

### Con Docker (Recomendado)

```bash
# 1. Clonar y navegar al proyecto
git clone <repository-url>
cd pruebaTecnicaCemaaco

# 2. Ejecutar todos los servicios
docker-compose up --build

# 3. Acceder a la aplicación
# Frontend: http://localhost:3000
# Backend API: http://localhost:5001
```

**¡Listo!** Los seeders se ejecutan automáticamente y crean usuarios de prueba.

### Sin Docker (Desarrollo)

#### Prerrequisitos
- Node.js 16+
- MySQL 8.0+
- Git

#### Backend Setup
```bash
cd backend
npm install

# Crear archivo .env
echo "DB_HOST=localhost
DB_NAME=cemaco_db
DB_USER=root
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key" > .env

# Ejecutar seeders (crear BD primero)
npm run seed

# Iniciar servidor
npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

**URLs:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

## � Usuarios de Prueba

| Email | Contraseña | Rol | Permisos |
|-------|------------|-----|----------|
| admin@cemaco.com | admin123 | ADMINISTRADOR | CRUD completo |
| colaborador@cemaco.com | colaborador123 | COLABORADOR | No puede eliminar |

## �️ Decisiones Técnicas

### 1. **Sequelize ORM para Seguridad**
**¿Por qué?** Prevención automática de inyección SQL y separa la lógica de negocio del acceso a datos. Al utilizar modelos y métodos del ORM en lugar de consultas SQL crudas
```javascript
// ❌ Vulnerable (SQL raw)
const query = `SELECT * FROM usuarios WHERE correo = '${email}'`;

// ✅ Seguro (Sequelize)
const usuario = await Usuario.findOne({ where: { correo: email } });
```

### 2. **Imágenes en Servidor vs Base de Datos**
**¿Por qué?** Performance y escalabilidad
- ✅ Base de datos más liviana (URLs vs BLOBs)
- ✅ Backups más rápidos
- ✅ Fácil migración a CDN en el futuro
- ✅ Serving estático optimizado

### 3. **Componentes Reutilizables en Frontend**
**¿Por qué?** Mantenibilidad y consistencia
- ✅ Fácil mantenimiento y actualizaciones
- ✅ Consistencia visual en toda la aplicación

### 4. **Modelo de Roles y Permisos Escalable**
**¿Por qué?** Flexibilidad para crecer
```sql
-- Estructura N:N permite agregar nuevos roles/permisos sin cambiar código
roles (id, nombre)
permisos (id, nombre)
rol_permisos (rolId, permisoId)
```

## 🏗️ Arquitectura

```
Frontend (React)     Backend (Node.js)     Database (MySQL)
     │                       │                     │
┌────▼────┐              ┌───▼────┐            ┌───▼───┐
│ Port    │   HTTP/API   │ Port   │  Sequelize │ Port  │
│ 3000    │ ◄──────────► │ 5001   │ ◄────────► │ 3306  │
│         │              │        │            │       │
│• Header │              │• JWT   │            │• Users│
│• Footer │              │• CRUD  │            │• Roles│
│• Admin  │              │• Upload│            │• Perms│
└─────────┘              └────────┘            └───────┘
```

## 📁 Estructura del Proyecto

```
pruebaTecnicaCemaaco/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Lógica de negocio (auth, productos)
│   │   ├── models/         # Modelos Sequelize (Usuario, Rol, etc.)
│   │   ├── routes/         # Rutas API REST
│   │   ├── middlewares/    # Autenticación y validación
│   │   ├── config/         # Configuración DB y Multer
│   │   └── seeders/        # Datos de prueba automáticos
│   └── uploads/products/   # Imágenes de productos
├── frontend/
│   ├── src/
│   │   ├── components/     # Header, Footer, Alert, etc.
│   │   │   ├── Alert.jsx          # Sistema de notificaciones
│   │   │   ├── FooterSection.jsx  # Componente footer reutilizable
│   │   │   ├── SocialIcon.jsx     # Iconos sociales
│   │   │   └── ProductCard.jsx    # Tarjeta de producto
│   │   ├── pages/         # Login, AdminProducts, PublicProducts
│   │   ├── auth/          # AuthContext para manejo de sesiones
│   │   ├── styles/        # CSS organizados por funcionalidad
│   │   │   ├── global.css        # Estilos globales (login, productos, etc.)
│   │   │   ├── Header.css        # Estilos del header y admin layout
│   │   │   └── Footer.css        # Estilos del footer responsivo
│   │   └── api/           # Configuración de endpoints
└── docker-compose.yml     # Orquestación de servicios

## � API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión

### Productos
- `GET /api/productos` - Listar productos públicos (inventario > 5)
- `POST /api/productos` - Crear producto 
- `PUT /api/productos/:id` - Actualizar producto
- `DELETE /api/productos/:id` - Eliminar producto

### Middleware de Seguridad
```javascript
// Todas las rutas admin requieren autenticación
app.use('/api/productos', verificarToken, verificarPermiso('ADMIN'));
```

## 🐳 Comandos Docker

### Comandos Básicos
```bash
# Iniciar todos los servicios
docker-compose up --build

# Ejecutar en background
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

### Comandos de Desarrollo
```bash
# Reconstruir un servicio específico
docker-compose build backend
docker-compose restart backend

# Ejecutar comandos dentro del container
docker-compose exec backend npm run seed
docker-compose exec database mysql -u cemaco_user -p

# Limpiar sistema
docker system prune -a
```

---

**Desarrollado con ❤️ para Cemaco**  
*Prueba técnica completa - E-commerce con React, Node.js y MySQL*

### 🎯 Funcionalidades Implementadas
- ✅ Réplica exacta del diseño de Cemaco.com
- ✅ Sistema de autenticación JWT seguro
- ✅ Panel de creación de productos
- ✅ Componentes React reutilizables
- ✅ Footer responsivo con acordeón móvil
- ✅ Header dinámico con cambio de logo al scroll
- ✅ API REST con validación y middleware de seguridad
- ✅ Gestión de imágenes optimizada
- ✅ Docker containerization para deployment fácil