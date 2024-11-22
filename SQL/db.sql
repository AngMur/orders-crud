-- Crear la base de datos
CREATE DATABASE OrdersDB;

-- Usar la base de datos recién creada
USE OrdersDB;

-- Crear la tabla orders con columnas que coinciden con la información proporcionada
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    photo_url VARCHAR(255),
    location VARCHAR(50),
    order_date DATE,
    status ENUM('Delivered', 'Cancelled', 'Pending', 'Shipped'),
    amount DECIMAL(10, 2),
    email VARCHAR(100),
    phone VARCHAR(20),
    notes TEXT
);