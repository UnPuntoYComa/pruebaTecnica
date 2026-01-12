import express from "express";
import { login, perfil } from "../controllers/auth.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Rutas públicas
router.post("/login", login);

// Rutas protegidas
router.get("/perfil", verificarToken, perfil);

export default router;