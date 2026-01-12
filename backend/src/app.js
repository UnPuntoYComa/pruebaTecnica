import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import productoRoutes from "./routes/producto.routes.js";
import sequelize from "./config/database.js";
import "./models/index.js"; // Importar asociaciones

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Rutas
app.use("/auth", authRoutes);
app.use("/productos", productoRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ 
    message: "API Backend funcionando correctamente",
    timestamp: new Date().toISOString()
  });
});

// Sincronizar base de datos
sequelize.sync();

export default app;
