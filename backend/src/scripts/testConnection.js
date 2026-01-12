import dotenv from "dotenv";
import { Sequelize } from "sequelize";

// Cargar variables de entorno
dotenv.config();

console.log("🔍 Verificando configuración de base de datos:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_DIALECT:", process.env.DB_DIALECT);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: console.log,
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos establecida correctamente");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error.message);
    console.log("\n📋 Posibles soluciones:");
    console.log("1. Asegúrate de que MySQL esté ejecutándose:");
    console.log("   - macOS: brew services start mysql");
    console.log("   - O usar XAMPP/MAMP");
    console.log("2. Verifica las credenciales en el archivo .env");
    console.log("3. Crea la base de datos si no existe:");
    console.log("   - mysql -u root -p");
    console.log("   - CREATE DATABASE prueba_tecnica;");
    process.exit(1);
  }
};

testConnection();
