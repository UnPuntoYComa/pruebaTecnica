import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Usuario, Rol, Permiso } from "../models/index.js";

const generarJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

export const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    // Verificar que los campos estén presentes
    if (!correo || !password) {
      return res.status(400).json({
        success: false,
        message: "Correo y contraseña son requeridos",
      });
    }

    // Buscar usuario con rol y permisos
    const usuario = await Usuario.findOne({
      where: { correo },
      include: [{
        model: Rol,
        as: 'rol',
        include: [{
          model: Permiso,
          as: 'permisos'
        }]
      }]
    });

    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }

    // Verificar contraseña
    const passwordValido = await usuario.verificarPassword(password);
    if (!passwordValido) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }

    const token = generarJWT(usuario.id);

    // Eliminar password de la respuesta
    const { password: _, ...usuarioSinPassword } = usuario.toJSON();

    res.json({
      success: true,
      message: "Login exitoso",
      data: {
        usuario: usuarioSinPassword,
        token,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

export const perfil = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id, {
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

    res.json({
      success: true,
      data: usuario,
    });
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};