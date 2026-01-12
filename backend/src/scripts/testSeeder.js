import dotenv from "dotenv";
dotenv.config();

import sequelize from "../config/database.js";

const testSeeder = async () => {
  try {
    console.log("🌱 Iniciando test seeder...");
    
    // Test 1: Conexión
    await sequelize.authenticate();
    console.log("✅ Conexión establecida");
    
    // Test 2: Sincronizar (crear tablas)
    await sequelize.sync({ force: true });
    console.log("✅ Tablas creadas");
    
    console.log("🎉 Test completado!");
    process.exit(0);
    
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

testSeeder();
