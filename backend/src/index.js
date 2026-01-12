import dotenv from "dotenv";
import app from "./app.js";
import { connectWithRetry } from "./config/database.js";

// Cargar variables de entorno
dotenv.config();

const PORT = process.env.PORT || 5000;

// Iniciar servidor solo después de conectar a la base de datos
const startServer = async () => {
  try {
    // Conectar a la base de datos con reintentos
    await connectWithRetry();
    
    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();
