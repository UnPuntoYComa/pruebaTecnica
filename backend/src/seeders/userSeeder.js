import dotenv from "dotenv";
dotenv.config();

import sequelize from "../config/database.js";
import Usuario from "../models/Usuario.js";
import Rol from "../models/Rol.js";
import Permiso from "../models/Permiso.js";
import RolPermiso from "../models/RolPermiso.js";
import Producto from "../models/Producto.js";
import { encriptarPassword } from "../utils/password.js";

// Establecer asociaciones manualmente
Usuario.belongsTo(Rol, { foreignKey: 'rolId', as: 'rol' });
Rol.hasMany(Usuario, { foreignKey: 'rolId', as: 'usuarios' });
Rol.belongsToMany(Permiso, { through: RolPermiso, foreignKey: 'rolId', otherKey: 'permisoId', as: 'permisos' });
Permiso.belongsToMany(Rol, { through: RolPermiso, foreignKey: 'permisoId', otherKey: 'rolId', as: 'roles' });

const seedDatabase = async () => {
  try {
    console.log("🌱 Iniciando seeder...");

    // Sincronizar base de datos
    await sequelize.sync({ force: true });
    console.log("✅ Base de datos sincronizada");

    // Crear roles
    const rolAdmin = await Rol.create({
      nombre: "ADMINISTRADOR",
    });

    const rolColaborador = await Rol.create({
      nombre: "COLABORADOR",
    });

    console.log("✅ Roles creados");

    // Crear permisos
    const permisoListar = await Permiso.create({ nombre: "LISTAR_PRODUCTOS" });
    const permisoCrear = await Permiso.create({ nombre: "CREAR_PRODUCTOS" });
    const permisoActualizar = await Permiso.create({ nombre: "ACTUALIZAR_PRODUCTOS" });
    const permisoEliminar = await Permiso.create({ nombre: "ELIMINAR_PRODUCTOS" });

    console.log("✅ Permisos creados");

    // Asignar permisos manualmente
    // Administrador: todos los permisos
    await RolPermiso.bulkCreate([
      { rolId: rolAdmin.id, permisoId: permisoListar.id },
      { rolId: rolAdmin.id, permisoId: permisoCrear.id },
      { rolId: rolAdmin.id, permisoId: permisoActualizar.id },
      { rolId: rolAdmin.id, permisoId: permisoEliminar.id },
    ]);

    // Colaborador: solo listar, crear y actualizar (sin eliminar)
    await RolPermiso.bulkCreate([
      { rolId: rolColaborador.id, permisoId: permisoListar.id },
      { rolId: rolColaborador.id, permisoId: permisoCrear.id },
      { rolId: rolColaborador.id, permisoId: permisoActualizar.id },
    ]);

    console.log("✅ Permisos asignados a roles");

    // Crear usuarios
    const passwordAdmin = await encriptarPassword("admin123");
    const usuarioAdmin = await Usuario.create({
      correo: "admin@test.com",
      password: passwordAdmin,
      nombre: "Administrador",
      apellido: "Sistema",
      rolId: rolAdmin.id,
    });

    const passwordColaborador = await encriptarPassword("colaborador123");
    const usuarioColaborador = await Usuario.create({
      correo: "colaborador@test.com",
      password: passwordColaborador,
      nombre: "Usuario",
      apellido: "Colaborador",
      rolId: rolColaborador.id,
    });

    console.log("✅ Usuarios creados:");
    console.log("👤 Administrador - Email: admin@test.com | Password: admin123");
    console.log("👤 Colaborador - Email: colaborador@test.com | Password: colaborador123");

    // Crear productos de ejemplo
    await Producto.bulkCreate([
      {
        nombre: "Laptop Gaming",
        descripcion: "Laptop para gaming de alta gama",
        precio: 1500.99,
        sku: "LAP001",
        inventario: 10,
        imagen: "laptop.jpg"
      },
      {
        nombre: "Mouse Gamer",
        descripcion: "Mouse RGB para gaming",
        precio: 45.99,
        sku: "MOU001",
        inventario: 25,
        imagen: "mouse.jpg"
      },
      {
        nombre: "Teclado Mecánico",
        descripcion: "Teclado mecánico Cherry MX",
        precio: 120.50,
        sku: "TEC001",
        inventario: 15,
        imagen: "teclado.jpg"
      }
    ]);

    console.log("✅ Productos de ejemplo creados");
    console.log("🎉 Seeder completado exitosamente!");
    
    await sequelize.close();
    process.exit(0);

  } catch (error) {
    console.error("❌ Error en seeder:", error);
    await sequelize.close();
    process.exit(1);
  }
};

seedDatabase();
