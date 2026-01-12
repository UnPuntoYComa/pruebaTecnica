import { Router } from "express";
import {
  listarPublicos,
  listar,
  crear,
  actualizar,
  eliminar
} from "../controllers/producto.controller.js";
import { verificarToken, verificarPermiso } from "../middlewares/auth.middleware.js";
import upload from "../config/multer.js";

const router = Router();

// Ruta pública
router.get("/publicos", listarPublicos);

// Rutas protegidas
router.get("/", verificarToken, verificarPermiso("LISTAR_PRODUCTOS"), listar);
router.post("/", verificarToken, verificarPermiso("CREAR_PRODUCTOS"), upload.single('imagen'), crear);
router.put("/:id", verificarToken, verificarPermiso("ACTUALIZAR_PRODUCTOS"), upload.single('imagen'), actualizar);
router.delete("/:id", verificarToken, verificarPermiso("ELIMINAR_PRODUCTOS"), eliminar);

export default router;
