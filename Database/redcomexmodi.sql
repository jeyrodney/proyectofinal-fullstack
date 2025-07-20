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

INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Afganistán', 'AF', 'Afgani afgano', 'AFN');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Alemania', 'DE', 'Euro', 'EUR');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Argentina', 'AR', 'Peso argentino', 'ARS');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Australia', 'AU', 'Dólar australiano', 'AUD');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Bolivia', 'BO', 'Boliviano', 'BOB');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Brasil', 'BR', 'Real brasileño', 'BRL');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Canadá', 'CA', 'Dólar canadiense', 'CAD');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Chile', 'CL', 'Peso chileno', 'CLP');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('China', 'CN', 'Yuan', 'CNY');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Colombia', 'CO', 'Peso colombiano', 'COP');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Corea del Sur', 'KR', 'Won surcoreano', 'KRW');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Cuba', 'CU', 'Peso cubano', 'CUP');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Ecuador', 'EC', 'Dólar estadounidense', 'USD');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Egipto', 'EG', 'Libra egipcia', 'EGP');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('España', 'ES', 'Euro', 'EUR');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Estados Unidos', 'US', 'Dólar estadounidense', 'USD');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Francia', 'FR', 'Euro', 'EUR');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('India', 'IN', 'Rupia india', 'INR');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Italia', 'IT', 'Euro', 'EUR');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Japón', 'JP', 'Yen japonés', 'JPY');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('México', 'MX', 'Peso mexicano', 'MXN');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Panamá', 'PA', 'Balboa / Dólar estadounidense', 'PAB/USD');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Paraguay', 'PY', 'Guaraní', 'PYG');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Perú', 'PE', 'Sol peruano', 'PEN');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Reino Unido', 'GB', 'Libra esterlina', 'GBP');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Rusia', 'RU', 'Rublo ruso', 'RUB');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Sudáfrica', 'ZA', 'Rand sudafricano', 'ZAR');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Uruguay', 'UY', 'Peso uruguayo', 'UYU');
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso) VALUES ('Venezuela', 'VE', 'Bolívar digital', 'VES');

INSERT INTO producto (nombre, codigo_HS, unidad_medida) VALUES
('Café', '0901', 'Tonelada'),
('Banano', '0803', 'Tonelada'),
('Aguacate', '0804', 'Tonelada'),
('Flores', '0603', 'Tonelada');