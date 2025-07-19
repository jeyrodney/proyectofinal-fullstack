CREATE DATABASE IF NOT EXISTS redcomexmodi
DEFAULT CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;
USE redcomexmodi;

DROP TABLE IF EXISTS arancel;
DROP TABLE IF EXISTS exportacion;
DROP TABLE IF EXISTS empresa;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS rol;
DROP TABLE IF EXISTS producto;
DROP TABLE IF EXISTS pais;

CREATE TABLE rol (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    rol VARCHAR(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE usuario (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_documento VARCHAR(20) NOT NULL,
    documento VARCHAR(30) UNIQUE NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    correo VARCHAR(50) UNIQUE NOT NULL,
    celular VARCHAR(30) NOT NULL,
    password_user VARCHAR(255) NOT NULL,
    fk_rol INT NOT NULL,
    FOREIGN KEY (fk_rol) REFERENCES rol(id_rol)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE empresa (
    id_empresa INT AUTO_INCREMENT PRIMARY KEY,
    nit VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    fk_usuario INT NOT NULL,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE producto (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    codigo_HS VARCHAR(20) NOT NULL,
    unidad_medida VARCHAR(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE pais (
    id_pais INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) UNIQUE NOT NULL,
    codigo_iso VARCHAR(30) UNIQUE NOT NULL,
    moneda_nombre VARCHAR(30) NOT NULL,
    moneda_codigo_iso VARCHAR(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE exportacion (
    id_exportacion INT AUTO_INCREMENT PRIMARY KEY,
    cantidad INT NOT NULL,
    fecha_exp DATE,
    valor_unitario DECIMAL(12, 2),
    tasa_cambio DECIMAL(12, 6),
    total DECIMAL(14, 2),
    total_moneda_destino DECIMAL(14, 2),
    costo_arancel DECIMAL(12, 2),
    estado_exportacion VARCHAR(30),
    fk_empresa INT NOT NULL,
    fk_producto INT NOT NULL,
    fk_pais INT NOT NULL,
    FOREIGN KEY (fk_empresa) REFERENCES empresa(id_empresa),
    FOREIGN KEY (fk_producto) REFERENCES producto(id_producto),
    FOREIGN KEY (fk_pais) REFERENCES pais(id_pais)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE arancel (
    id_arancel INT AUTO_INCREMENT PRIMARY KEY,
    tasa_arancel DECIMAL(5, 2) NOT NULL,
    fk_pais INT NOT NULL,
    fk_producto INT NOT NULL,
    UNIQUE (fk_pais, fk_producto),
    FOREIGN KEY (fk_pais) REFERENCES pais(id_pais),
    FOREIGN KEY (fk_producto) REFERENCES producto(id_producto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO rol (rol) VALUES ('Administrador'), ('Usuario');

INSERT INTO usuario (
    tipo_documento, documento, nombre, correo, celular, password_user, fk_rol
) VALUES (
    'Cédula', '8128407', 'Jeyson Rodney Ulloa', 'redes.ulloa@gmail.com', '3116429452',
    '$2a$10$b94glGFlBAU9ozrC5lHGhOitrTFNBPcABombHfkqBwECxkhb5EM2C', 1
);
