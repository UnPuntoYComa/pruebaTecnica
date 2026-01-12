import jwt from "jsonwebtoken";
import { Usuario, Rol, Permiso } from "../models/index.js";

export const verificarToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token no proporcionado",
      });
    }

    // Extraer token del header "Bearer token"
    if (token.startsWith("Bearer ")) {
      token = token.slice(7);
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar usuario con rol y permisos
    const usuario = await Usuario.findByPk(decoded.id, {
      include: [{
        model: Rol,
        as: 'rol',
        include: [{
          model: Permiso,
          as: 'permisos'
        }]
      }],
      attributes: { exclude: ['password'] }
    });

    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: "Token inválido - Usuario no encontrado",
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.error("Error en verificarToken:", error);
    return res.status(401).json({
      success: false,
      message: "Token inválido",
      error: error.message,
    });
  }
};

export const verificarPermiso = (permisoNombre) => {
  return (req, res, next) => {
    try {
      const usuario = req.usuario;
      
      if (!usuario || !usuario.rol || !usuario.rol.permisos) {
        return res.status(403).json({
          success: false,
          message: "Acceso denegado - Sin permisos",
        });
      }

      // Verificar si el usuario tiene el permiso específico
      const tienePermiso = usuario.rol.permisos.some(permiso => 
        permiso.nombre === permisoNombre
      );

      if (!tienePermiso) {
        return res.status(403).json({
          success: false,
          message: `Acceso denegado - No tiene el permiso: ${permisoNombre}`,
        });
      }

      next();
    } catch (error) {
      console.error("Error en verificarPermiso:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        error: error.message,
      });
    }
  };
};