import Usuario from "./Usuario.js";
import Rol from "./Rol.js";
import Permiso from "./Permiso.js";
import RolPermiso from "./RolPermiso.js";
import Producto from "./Producto.js";

// Relaciones Usuario - Rol
Usuario.belongsTo(Rol, { 
  foreignKey: 'rolId', 
  as: 'rol' 
});

Rol.hasMany(Usuario, { 
  foreignKey: 'rolId', 
  as: 'usuarios' 
});

// Relaciones Rol - Permiso (Many to Many)
Rol.belongsToMany(Permiso, {
  through: RolPermiso,
  foreignKey: 'rolId',
  otherKey: 'permisoId',
  as: 'permisos'
});

Permiso.belongsToMany(Rol, {
  through: RolPermiso,
  foreignKey: 'permisoId',
  otherKey: 'rolId',
  as: 'roles'
});

// Relaciones directas para la tabla intermedia
RolPermiso.belongsTo(Rol, { foreignKey: 'rolId' });
RolPermiso.belongsTo(Permiso, { foreignKey: 'permisoId' });

export {
  Usuario,
  Rol,
  Permiso,
  RolPermiso,
  Producto
};
