-- Archivo de inicialización para MySQL
-- Este archivo se ejecuta automáticamente cuando se crea el contenedor

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS cemaco_db;

-- Usar la base de datos
USE cemaco_db;

-- Configurar charset
SET NAMES utf8mb4;
SET character_set_client = utf8mb4;
