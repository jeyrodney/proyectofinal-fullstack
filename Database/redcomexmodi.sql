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
    moneda_codigo_iso VARCHAR(5) NOT NULL,
    tasa_cambio DECIMAL(12, 6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE exportacion (
    id_exportacion INT AUTO_INCREMENT PRIMARY KEY,
    cantidad INT NOT NULL,
    fecha_exp DATE,
    valor_unitario DECIMAL(12, 2),
    tasa_cambio DECIMAL(12, 6),
    total DECIMAL(14, 2),
    total_moneda_destino DECIMAL(14, 2),
    arancel_cobrado DECIMAL(12, 2),
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
    'Cédula', '8888888', 'Administrador', 'adminisrtador@gmail.com', '3117778989',
    '$2a$10$b94glGFlBAU9ozrC5lHGhOitrTFNBPcABombHfkqBwECxkhb5EM2C', 1
);

INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('Afganistán', 'AF', 'Afgani afgano', 'AFN', 0.01699);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('Alemania', 'DE', 'Euro', 'EUR', 0.00021);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('Argentina', 'AR', 'Peso argentino', 'ARS', 0.31);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('Australia', 'AU', 'Dólar australiano', 'AUD', 0.00037);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('Bolivia', 'BO', 'Boliviano', 'BOB', 0.0017);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('Brasil', 'BR', 'Real brasileño', 'BRL', 0.0014);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('Canadá', 'CA', 'Dólar canadiense', 'CAD', 0.00034);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('Chile', 'CL', 'Peso chileno', 'CLP', 0.23);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('China', 'CN', 'Yuan', 'CNY', 0.0018);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('Corea del Sur', 'KR', 'Won surcoreano', 'KRW', 0.34);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('Cuba', 'CU', 'Peso cubano', 'CUP', 0.0059);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('Ecuador', 'EC', 'Dólar estadounidense', 'USD', 0.00024);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('Egipto', 'EG', 'Libra egipcia', 'EGP', 0.012);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('España', 'ES', 'Euro', 'EUR', 0.00021);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('Estados Unidos', 'US', 'Dólar estadounidense', 'USD', 0.00024);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('Francia', 'FR', 'Euro', 'EUR', 0.00021);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('India', 'IN', 'Rupia india', 'INR', 0.021);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('Italia', 'IT', 'Euro', 'EUR', 0.00021);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('Japón', 'JP', 'Yen japonés', 'JPY', 0.036);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('México', 'MX', 'Peso mexicano', 'MXN', 0.0046);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('Panamá', 'PA', 'Balboa / Dólar estadounidense', 'PAB/USD', 0.00025);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('Paraguay', 'PY', 'Guaraní', 'PYG', 1.84);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('Perú', 'PE', 'Sol peruano', 'PEN', 0.00087);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('Reino Unido', 'GB', 'Libra esterlina', 'GBP', 0.00018);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('Rusia', 'RU', 'Rublo ruso', 'RUB', 0.020);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('Sudáfrica', 'ZA', 'Rand sudafricano', 'ZAR', 0.0044);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('Uruguay', 'UY', 'Peso uruguayo', 'UYU', 0.0099);
INSERT INTO pais (nombre, codigo_iso, moneda_nombre, moneda_codigo_iso, tasa_cambio) VALUES ('Venezuela', 'VE', 'Bolívar digital', 'VES', 0.030);

INSERT INTO producto (nombre, codigo_HS, unidad_medida) VALUES
('Café', '0901', 'Tonelada'),
('Banano', '0803', 'Tonelada'),
('Aguacate', '0804', 'Tonelada'),
('Flores', '0603', 'Tonelada');

INSERT INTO arancel (tasa_arancel, fk_pais, fk_producto) VALUES
(10.00, (SELECT id_pais FROM pais WHERE nombre = 'Afganistán'), (SELECT id_producto FROM producto WHERE nombre = 'Café')),
(12.50, (SELECT id_pais FROM pais WHERE nombre = 'Alemania'), (SELECT id_producto FROM producto WHERE nombre = 'Banano')),
(15.00, (SELECT id_pais FROM pais WHERE nombre = 'Argentina'), (SELECT id_producto FROM producto WHERE nombre = 'Aguacate')),
(8.00, (SELECT id_pais FROM pais WHERE nombre = 'Australia'), (SELECT id_producto FROM producto WHERE nombre = 'Flores')),
(10.50, (SELECT id_pais FROM pais WHERE nombre = 'Brasil'), (SELECT id_producto FROM producto WHERE nombre = 'Café')),
(14.00, (SELECT id_pais FROM pais WHERE nombre = 'Canadá'), (SELECT id_producto FROM producto WHERE nombre = 'Banano')),
(9.50, (SELECT id_pais FROM pais WHERE nombre = 'Chile'), (SELECT id_producto FROM producto WHERE nombre = 'Aguacate')),
(11.00, (SELECT id_pais FROM pais WHERE nombre = 'China'), (SELECT id_producto FROM producto WHERE nombre = 'Flores')),
(13.00, (SELECT id_pais FROM pais WHERE nombre = 'Corea del Sur'), (SELECT id_producto FROM producto WHERE nombre = 'Café')),
(7.50, (SELECT id_pais FROM pais WHERE nombre = 'Cuba'), (SELECT id_producto FROM producto WHERE nombre = 'Banano')),
(10.00, (SELECT id_pais FROM pais WHERE nombre = 'Ecuador'), (SELECT id_producto FROM producto WHERE nombre = 'Aguacate')),
(16.00, (SELECT id_pais FROM pais WHERE nombre = 'España'), (SELECT id_producto FROM producto WHERE nombre = 'Flores')),
(11.50, (SELECT id_pais FROM pais WHERE nombre = 'Estados Unidos'), (SELECT id_producto FROM producto WHERE nombre = 'Café')),
(10.00, (SELECT id_pais FROM pais WHERE nombre = 'Estados Unidos'), (SELECT id_producto FROM producto WHERE nombre = 'Aguacate')),
(8.50, (SELECT id_pais FROM pais WHERE nombre = 'Estados Unidos'), (SELECT id_producto FROM producto WHERE nombre = 'Banano')),
(9.50, (SELECT id_pais FROM pais WHERE nombre = 'Estados Unidos'), (SELECT id_producto FROM producto WHERE nombre = 'Flores')),
(13.00, (SELECT id_pais FROM pais WHERE nombre = 'Francia'), (SELECT id_producto FROM producto WHERE nombre = 'Banano')),
(9.00, (SELECT id_pais FROM pais WHERE nombre = 'India'), (SELECT id_producto FROM producto WHERE nombre = 'Aguacate')),
(8.50, (SELECT id_pais FROM pais WHERE nombre = 'Italia'), (SELECT id_producto FROM producto WHERE nombre = 'Flores')),
(14.00, (SELECT id_pais FROM pais WHERE nombre = 'Japón'), (SELECT id_producto FROM producto WHERE nombre = 'Café')),
(12.00, (SELECT id_pais FROM pais WHERE nombre = 'México'), (SELECT id_producto FROM producto WHERE nombre = 'Banano')),
(10.00, (SELECT id_pais FROM pais WHERE nombre = 'Panamá'), (SELECT id_producto FROM producto WHERE nombre = 'Aguacate')),
(13.50, (SELECT id_pais FROM pais WHERE nombre = 'Paraguay'), (SELECT id_producto FROM producto WHERE nombre = 'Flores')),
(15.00, (SELECT id_pais FROM pais WHERE nombre = 'Perú'), (SELECT id_producto FROM producto WHERE nombre = 'Café')),
(12.00, (SELECT id_pais FROM pais WHERE nombre = 'Reino Unido'), (SELECT id_producto FROM producto WHERE nombre = 'Banano')),
(9.00, (SELECT id_pais FROM pais WHERE nombre = 'Rusia'), (SELECT id_producto FROM producto WHERE nombre = 'Aguacate')),
(16.50, (SELECT id_pais FROM pais WHERE nombre = 'Sudáfrica'), (SELECT id_producto FROM producto WHERE nombre = 'Flores')),
(7.00, (SELECT id_pais FROM pais WHERE nombre = 'Uruguay'), (SELECT id_producto FROM producto WHERE nombre = 'Café')),
(14.50, (SELECT id_pais FROM pais WHERE nombre = 'Venezuela'), (SELECT id_producto FROM producto WHERE nombre = 'Banano'));