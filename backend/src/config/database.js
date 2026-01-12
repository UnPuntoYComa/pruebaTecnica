import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000
    },
    retry: {
      max: 10
    }
  }
);

// Función para conectar con reintentos
export const connectWithRetry = async (maxRetries = 10, delay = 5000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await sequelize.authenticate();
      console.log('✅ Conexión a la base de datos establecida correctamente');
      return true;
    } catch (error) {
      console.log(`❌ Intento ${i + 1}/${maxRetries} falló: ${error.message}`);
      if (i < maxRetries - 1) {
        console.log(`⏳ Reintentando en ${delay / 1000} segundos...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error('💥 No se pudo conectar a la base de datos después de varios intentos');
        throw error;
      }
    }
  }
};

export default sequelize;
