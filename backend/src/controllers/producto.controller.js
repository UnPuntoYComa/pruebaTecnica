import { Producto } from "../models/index.js";
import { Op } from "sequelize";
import path from "path";
import fs from "fs/promises";

export const listarPublicos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      where: {
        inventario: { [Op.gt]: 5 },
      },
    });

    res.json({
      success: true,
      data: productos,
    });
  } catch (error) {
    console.error("Error al listar productos públicos:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

export const listar = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const offset = (page - 1) * limit;

    const whereCondition = search
      ? {
          [Op.or]: [
            { nombre: { [Op.iLike]: `%${search}%` } },
            { descripcion: { [Op.iLike]: `%${search}%` } },
            { sku: { [Op.iLike]: `%${search}%` } },
          ],
        }
      : {};

    const { count, rows } = await Producto.findAndCountAll({
      where: whereCondition,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      data: {
        productos: rows,
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
      },
    });
  } catch (error) {
    console.error("Error al listar productos:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

export const crear = async (req, res) => {
  try {
    const { nombre, descripcion, precio, sku, inventario } = req.body;
    const imagen = req.file ? req.file.filename : null;

    // Validar campos requeridos
    if (!nombre || !descripcion || !precio || !sku || !inventario || !imagen) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son requeridos, incluyendo la imagen",
      });
    }

    // Verificar que el SKU no exista
    const skuExiste = await Producto.findOne({ where: { sku } });
    if (skuExiste) {
      return res.status(400).json({
        success: false,
        message: "El SKU ya existe",
      });
    }

    const producto = await Producto.create({
      nombre,
      descripcion,
      precio: parseFloat(precio),
      sku,
      inventario: parseInt(inventario),
      imagen,
    });

    res.status(201).json({
      success: true,
      message: "Producto creado exitosamente",
      data: producto,
    });
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

export const actualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, sku, inventario } = req.body;
    const imagen = req.file ? req.file.filename : null;

    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    // Verificar que el SKU no exista en otro producto
    if (sku && sku !== producto.sku) {
      const skuExiste = await Producto.findOne({ 
        where: { 
          sku,
          id: { [Op.ne]: id } 
        } 
      });
      if (skuExiste) {
        return res.status(400).json({
          success: false,
          message: "El SKU ya existe en otro producto",
        });
      }
    }

    // Si hay nueva imagen, eliminar la anterior
    if (imagen && producto.imagen) {
      try {
        await fs.unlink(path.join(process.cwd(), 'uploads', 'products', producto.imagen));
      } catch (error) {
        console.log("No se pudo eliminar la imagen anterior:", error.message);
      }
    }

    // Actualizar producto
    const datosActualizacion = {
      ...(nombre && { nombre }),
      ...(descripcion && { descripcion }),
      ...(precio && { precio: parseFloat(precio) }),
      ...(sku && { sku }),
      ...(inventario !== undefined && { inventario: parseInt(inventario) }),
      ...(imagen && { imagen }),
    };

    await producto.update(datosActualizacion);

    res.json({
      success: true,
      message: "Producto actualizado exitosamente",
      data: producto,
    });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

export const eliminar = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    // Eliminar imagen asociada
    if (producto.imagen) {
      try {
        await fs.unlink(path.join(process.cwd(), 'uploads', 'products', producto.imagen));
      } catch (error) {
        console.log("No se pudo eliminar la imagen:", error.message);
      }
    }

    await producto.destroy();

    res.json({
      success: true,
      message: "Producto eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
