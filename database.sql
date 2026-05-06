-- database.sql
-- Ejecuta este script en phpMyAdmin o MySQL Workbench ANTES de iniciar el servidor

-- 1. Crear la base de datos
CREATE DATABASE IF NOT EXISTS inventario_tienda
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE inventario_tienda;

-- 2. Crear la tabla de productos
CREATE TABLE IF NOT EXISTS productos (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  nombre     VARCHAR(255)   NOT NULL,
  precio     DECIMAL(10, 2) NOT NULL,
  stock      INT            NOT NULL DEFAULT 0,
  imagen     VARCHAR(255)   DEFAULT '',
  created_at TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Insertar datos de ejemplo
INSERT INTO productos (nombre, precio, stock, imagen) VALUES
  ('Laptop Lenovo IdeaPad 3',  2899.99, 15, ''),
  ('Mouse Logitech MX Master', 189.90,  40, ''),
  ('Teclado Mecánico Redragon', 149.50,  25, ''),
  ('Monitor LG 24" Full HD',   699.00,  10, ''),
  ('Audífonos Sony WH-1000XM5',549.90,   8, '');