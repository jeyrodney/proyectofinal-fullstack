-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-07-2025 a las 03:57:12
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `redcomexmodi`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `arancel`
--

CREATE TABLE `arancel` (
  `id_arancel` int(11) NOT NULL,
  `tasa_arancel` decimal(5,2) NOT NULL,
  `fk_pais` int(11) NOT NULL,
  `fk_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `arancel`
--

INSERT INTO `arancel` (`id_arancel`, `tasa_arancel`, `fk_pais`, `fk_producto`) VALUES
(1, 10.00, 1, 1),
(2, 12.50, 2, 2),
(3, 15.00, 3, 3),
(4, 8.00, 4, 4),
(5, 10.50, 6, 1),
(6, 14.00, 7, 2),
(7, 9.50, 8, 3),
(8, 11.00, 9, 4),
(9, 13.00, 10, 1),
(10, 7.50, 11, 2),
(11, 10.00, 12, 3),
(12, 16.00, 14, 4),
(13, 11.50, 15, 1),
(14, 10.00, 15, 3),
(15, 8.50, 15, 2),
(16, 9.50, 15, 4),
(17, 13.00, 16, 2),
(18, 9.00, 17, 3),
(19, 8.50, 18, 4),
(20, 14.00, 19, 1),
(21, 12.00, 20, 2),
(22, 10.00, 21, 3),
(23, 13.50, 22, 4),
(24, 15.00, 23, 1),
(25, 12.00, 24, 2),
(26, 9.00, 25, 3),
(27, 16.50, 26, 4),
(28, 7.00, 27, 1),
(29, 14.50, 28, 2),
(30, 8.00, 22, 2),
(31, 9.00, 20, 1),
(32, 7.00, 20, 3),
(33, 8.50, 20, 4),
(34, 7.50, 6, 2),
(35, 6.00, 6, 4),
(36, 6.00, 6, 3),
(37, 7.00, 21, 4),
(38, 5.00, 23, 4),
(39, 8.00, 25, 4),
(40, 4.00, 10, 2),
(41, 13.60, 24, 3),
(42, 11.00, 13, 2),
(43, 11.00, 12, 4),
(44, 9.00, 14, 3),
(45, 11.00, 16, 3),
(46, 7.00, 3, 4),
(47, 8.00, 8, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `id_empresa` int(11) NOT NULL,
  `nit` varchar(20) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `fk_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`id_empresa`, `nit`, `nombre`, `descripcion`, `fk_usuario`) VALUES
(1, '456789132', 'Aguacates Antioquia', 'Empresa de Aguacates', 2),
(2, '32455678', 'Colbananos', 'Empresa de bananos', 3),
(3, '3333333333', 'Flores y Flores', 'Empresa de flores', 4),
(4, '45128795', 'Café Andaluz', 'Empresa de café Antioqueño', 5),
(5, '415789456', 'Agroindustria', 'Empresa de Aguacates y Bananos', 6),
(6, '4986543', 'Café Monteloro', 'Empresa de Café', 3),
(7, '789456123', 'Flores Santa Elena', 'Empresa de Flores', 2),
(8, '6124879546', 'Agricolas de Colombia', 'Empresa productora de Bananos y Café', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exportacion`
--

CREATE TABLE `exportacion` (
  `id_exportacion` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha_exp` date DEFAULT NULL,
  `valor_unitario` decimal(12,2) DEFAULT NULL,
  `tasa_cambio` decimal(12,6) DEFAULT NULL,
  `total` decimal(14,2) DEFAULT NULL,
  `total_moneda_destino` decimal(14,2) DEFAULT NULL,
  `arancel_cobrado` decimal(12,2) DEFAULT NULL,
  `estado_exportacion` varchar(30) DEFAULT NULL,
  `fk_empresa` int(11) NOT NULL,
  `fk_producto` int(11) NOT NULL,
  `fk_pais` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `exportacion`
--

INSERT INTO `exportacion` (`id_exportacion`, `cantidad`, `fecha_exp`, `valor_unitario`, `tasa_cambio`, `total`, `total_moneda_destino`, `arancel_cobrado`, `estado_exportacion`, `fk_empresa`, `fk_producto`, `fk_pais`) VALUES
(2, 900, '2025-07-28', 4000.00, 0.000240, 3600000.00, 864.00, 360000.00, 'En proceso', 1, 3, 15),
(3, 600, '2025-07-25', 4000.00, 0.230000, 2400000.00, 552000.00, 228000.00, 'Completado', 1, 3, 8),
(4, 1100, '2025-07-23', 3500.00, 0.004600, 3850000.00, 17710.00, 462000.00, 'Completado', 2, 2, 20),
(5, 2000, '2025-07-25', 3500.00, 0.000340, 7000000.00, 2380.00, 980000.00, 'Completado', 2, 2, 7),
(6, 3000, '2025-07-22', 3500.00, 0.000240, 10500000.00, 2520.00, 892500.00, 'Completado', 2, 2, 15),
(7, 900, '2025-07-22', 3500.00, 0.000210, 3150000.00, 661.50, 393750.00, 'Completado', 2, 2, 2),
(8, 100, '2025-07-23', 30000.00, 0.001400, 3000000.00, 4200.00, 180000.00, 'Completada', 3, 4, 6),
(9, 200, '2025-07-24', 30000.00, 0.000240, 6000000.00, 1440.00, 570000.00, 'Completada', 3, 4, 15),
(10, 100, '2025-07-23', 30000.00, 0.000210, 3000000.00, 630.00, 255000.00, 'Completada', 3, 4, 18),
(11, 1300, '2025-07-22', 29000.00, 0.036000, 37700000.00, 1357200.00, 5278000.00, 'Completada', 4, 1, 19),
(12, 1600, '2025-07-22', 3700.00, 0.230000, 5920000.00, 1361600.00, 562400.00, 'Completada', 5, 3, 8),
(13, 700, '2025-07-15', 90000.00, 0.004400, 63000000.00, 277200.00, 10395000.00, 'Completada', 3, 4, 26),
(14, 600, '2025-07-03', 5000.00, 0.000240, 3000000.00, 720.00, 300000.00, 'Procesado', 1, 3, 15),
(15, 900, '2025-06-01', 7000.00, 0.000210, 6300000.00, 1323.00, 819000.00, 'Procesado', 2, 2, 16),
(16, 1400, '2025-06-04', 90000.00, 0.000240, 126000000.00, 30240.00, 14490000.00, 'Procesado', 6, 1, 15),
(17, 1800, '2025-06-12', 70000.00, 1.840000, 126000000.00, 231840000.00, 17010000.00, 'Procesado', 5, 4, 22),
(18, 700, '2025-05-21', 85000.00, 1.840000, 59500000.00, 109480000.00, 8032500.00, 'Procesado', 7, 4, 22),
(19, 650, '2025-06-18', 96000.00, 0.000240, 62400000.00, 14976.00, 5928000.00, 'Procesado', 7, 4, 15),
(20, 500, '2025-05-12', 70000.00, 0.001400, 35000000.00, 49000.00, 3675000.00, 'Procesado', 4, 1, 6),
(21, 300, '2025-05-02', 9000.00, 0.000210, 2700000.00, 567.00, 351000.00, 'Entregado', 8, 2, 16),
(22, 850, '2025-06-11', 85000.00, 0.005900, 72250000.00, 426275.00, 5418750.00, 'Entregado', 8, 2, 11),
(23, 450, '2025-06-16', 7000.00, 0.000240, 3150000.00, 756.00, 362250.00, 'Entregado', 4, 1, 15),
(24, 800, '2025-06-05', 8500.00, 0.000210, 6800000.00, 1428.00, 884000.00, 'Entregado', 8, 2, 16),
(25, 1000, '2025-07-17', 9000.00, 0.012000, 9000000.00, 108000.00, 990000.00, 'Entregado', 8, 2, 13),
(26, 500, '2025-04-22', 8000.00, 0.001400, 4000000.00, 5600.00, 300000.00, 'Entregado', 8, 2, 6),
(27, 500, '2025-05-21', 70000.00, 0.000240, 35000000.00, 8400.00, 2100000.00, 'Entregado', 3, 4, 12),
(28, 650, '2025-06-18', 65000.00, 0.000240, 42250000.00, 10140.00, 4647500.00, 'Entregado', 3, 4, 12),
(29, 700, '2025-06-11', 75000.00, 0.000210, 52500000.00, 11025.00, 4725000.00, 'Entregado', 1, 3, 14),
(30, 1200, '2025-05-14', 80000.00, 0.000210, 96000000.00, 20160.00, 10560000.00, 'Entregado', 1, 3, 16),
(31, 1300, '2025-08-05', 45000.00, 0.310000, 2925000000.00, 906750000.00, 204750000.00, 'En transito', 7, 4, 3),
(32, 1200, '2025-04-22', 10000.00, 0.000240, 12000000.00, 2880.00, 1200000.00, 'Entregado', 1, 3, 15),
(33, 800, '2025-04-15', 87000.00, 0.000210, 69600000.00, 14616.00, 11136000.00, 'Entregado', 7, 4, 14),
(34, 1250, '2025-04-15', 9500.00, 0.000210, 11875000.00, 2493.75, 1306250.00, 'Entregado', 5, 3, 16),
(35, 1400, '2025-05-21', 77000.00, 0.230000, 107800000.00, 24794000.00, 8624000.00, 'Entregado', 5, 1, 8),
(36, 1400, '2025-05-21', 79000.00, 0.000240, 110600000.00, 26544.00, 12719000.00, 'Entregado', 6, 1, 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pais`
--

CREATE TABLE `pais` (
  `id_pais` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `codigo_iso` varchar(30) NOT NULL,
  `moneda_nombre` varchar(30) NOT NULL,
  `moneda_codigo_iso` varchar(5) NOT NULL,
  `tasa_cambio` decimal(12,6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pais`
--

INSERT INTO `pais` (`id_pais`, `nombre`, `codigo_iso`, `moneda_nombre`, `moneda_codigo_iso`, `tasa_cambio`) VALUES
(1, 'Afganistán', 'AF', 'Afgani afgano', 'AFN', 0.016990),
(2, 'Alemania', 'DE', 'Euro', 'EUR', 0.000210),
(3, 'Argentina', 'AR', 'Peso argentino', 'ARS', 0.310000),
(4, 'Australia', 'AU', 'Dólar australiano', 'AUD', 0.000370),
(5, 'Bolivia', 'BO', 'Boliviano', 'BOB', 0.001700),
(6, 'Brasil', 'BR', 'Real brasileño', 'BRL', 0.001400),
(7, 'Canadá', 'CA', 'Dólar canadiense', 'CAD', 0.000200),
(8, 'Chile', 'CL', 'Peso chileno', 'CLP', 0.230000),
(9, 'China', 'CN', 'Yuan', 'CNY', 0.001800),
(10, 'Corea del Sur', 'KR', 'Won surcoreano', 'KRW', 0.340000),
(11, 'Cuba', 'CU', 'Peso cubano', 'CUP', 0.005900),
(12, 'Ecuador', 'EC', 'Dólar estadounidense', 'USD', 0.000240),
(13, 'Egipto', 'EG', 'Libra egipcia', 'EGP', 0.012000),
(14, 'España', 'ES', 'Euro', 'EUR', 0.000210),
(15, 'Estados Unidos', 'US', 'Dólar estadounidense', 'USD', 0.000240),
(16, 'Francia', 'FR', 'Euro', 'EUR', 0.000210),
(17, 'India', 'IN', 'Rupia india', 'INR', 0.021000),
(18, 'Italia', 'IT', 'Euro', 'EUR', 0.000210),
(19, 'Japón', 'JP', 'Yen japonés', 'JPY', 0.036000),
(20, 'México', 'MX', 'Peso mexicano', 'MXN', 0.004500),
(21, 'Panamá', 'PA', 'Balboa / Dólar estadounidense', 'PAB/U', 0.000250),
(22, 'Paraguay', 'PY', 'Guaraní', 'PYG', 1.840000),
(23, 'Perú', 'PE', 'Sol peruano', 'PEN', 0.000870),
(24, 'Reino Unido', 'GB', 'Libra esterlina', 'GBP', 0.000180),
(25, 'Rusia', 'RU', 'Rublo ruso', 'RUB', 0.020000),
(26, 'Sudáfrica', 'ZA', 'Rand sudafricano', 'ZAR', 0.004400),
(27, 'Uruguay', 'UY', 'Peso uruguayo', 'UYU', 0.009900),
(28, 'Venezuela', 'VE', 'Bolívar digital', 'VES', 0.030000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `codigo_HS` varchar(20) NOT NULL,
  `unidad_medida` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `nombre`, `codigo_HS`, `unidad_medida`) VALUES
(1, 'Café', '0901', 'Tonelada'),
(2, 'Banano', '0803', 'Tonelada'),
(3, 'Aguacate', '0804', 'Tonelada'),
(4, 'Flores', '0603', 'Tonelada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `rol` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `rol`) VALUES
(1, 'Administrador'),
(2, 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `usuario_id` int(11) NOT NULL,
  `tipo_documento` varchar(20) NOT NULL,
  `documento` varchar(30) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `celular` varchar(30) NOT NULL,
  `password_user` varchar(255) NOT NULL,
  `fk_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`usuario_id`, `tipo_documento`, `documento`, `nombre`, `correo`, `celular`, `password_user`, `fk_rol`) VALUES
(1, 'Cédula', '8128407', 'Jeyson Rodney Ulloa', 'redes.ulloa@gmail.com', '3116429452', '$2a$10$b94glGFlBAU9ozrC5lHGhOitrTFNBPcABombHfkqBwECxkhb5EM2C', 1),
(2, 'Cédula', '878945612', 'Mario Lopez', 'mario@gmail.com', '3112454545', '$2a$12$2FUFfE5Oy/dfF9OX0XCtCO5mwetc0m2AKV9bfvvRlZVOcqKf70Aw.', 2),
(3, 'Cédula', '63214578', 'Ana Gonzalez', 'ana@gmail.com', '3204444444', '$2a$12$v2Rxez/0/IQJGCch1nURsOkf7D7wQF3pR3fenMNXkOTXqyg0FhrTe', 2),
(4, 'Cédula', '495781235', 'Alejandro Alvarez', 'alejandro@gmail.com', '3104787878', '$2a$12$h6aXget5QpKohJkYIX.ETefOCCPJ05Vpg69YJKr3nKiCqdJGwj1I.', 2),
(5, 'Cédula', '123456789', 'Jaime Zapata', 'jaime@gmail.com', '3112112244', '$2a$12$hYQVFZRg4jNtVcFrSLzDieIcPTZ5V/P1w8v.EQgsM/OvUDP/o4Kze', 2),
(6, 'Cédula', '45698753', 'Camilo Mendez', 'camilo@gmail.com', '3214595959', '$2a$12$YRMRKoxJ5n3LwZT2GSCt8uHlPmYBV6MZqXAIlizKjPtx0BOdvL4iq', 2),
(7, 'Cédula', '46642002', 'Luz Marina Ulloa', 'luz@gmail.com', '3214789988', '$2a$12$yBPqR/6gupeugIM7QMG4He.1Kzkp/WD23I0JxeMNsDRdEr1Rge/BK', 1),
(8, 'Cédula', '65479435', 'Armando Mendoza', 'armando@gmail.com', '3216549874', '$2a$12$bfvjo6ZUxFMsVw4/E9iLxer3ugFnI598bD5s2fLtvUT9RK9KTtGQy', 1),
(11, 'Cédula', '1234654879', 'Zulayda Gutierrez', 'zulayda@gmail.com', '3004521369', '$2a$12$JvcQw42Q0vyfdpDpDxFHhux/ZplJ5f5DOdpb6TD8iXcin8msWexf6', 2),
(12, 'Cédula', '64444444', 'Melisa Casas', 'melisa@gmail.com', '3212154598', '$2a$12$rLAgoo9WJ5jtl5chM3NoIOCFokhsDZ4fEMit4E0w2/ArmmnZylb0i', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `arancel`
--
ALTER TABLE `arancel`
  ADD PRIMARY KEY (`id_arancel`),
  ADD UNIQUE KEY `fk_pais` (`fk_pais`,`fk_producto`),
  ADD KEY `fk_producto` (`fk_producto`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`id_empresa`),
  ADD UNIQUE KEY `nit` (`nit`),
  ADD KEY `fk_usuario` (`fk_usuario`);

--
-- Indices de la tabla `exportacion`
--
ALTER TABLE `exportacion`
  ADD PRIMARY KEY (`id_exportacion`),
  ADD KEY `fk_empresa` (`fk_empresa`),
  ADD KEY `fk_producto` (`fk_producto`),
  ADD KEY `fk_pais` (`fk_pais`);

--
-- Indices de la tabla `pais`
--
ALTER TABLE `pais`
  ADD PRIMARY KEY (`id_pais`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD UNIQUE KEY `codigo_iso` (`codigo_iso`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`usuario_id`),
  ADD UNIQUE KEY `documento` (`documento`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `fk_rol` (`fk_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `arancel`
--
ALTER TABLE `arancel`
  MODIFY `id_arancel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `id_empresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `exportacion`
--
ALTER TABLE `exportacion`
  MODIFY `id_exportacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `pais`
--
ALTER TABLE `pais`
  MODIFY `id_pais` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `arancel`
--
ALTER TABLE `arancel`
  ADD CONSTRAINT `arancel_ibfk_1` FOREIGN KEY (`fk_pais`) REFERENCES `pais` (`id_pais`),
  ADD CONSTRAINT `arancel_ibfk_2` FOREIGN KEY (`fk_producto`) REFERENCES `producto` (`id_producto`);

--
-- Filtros para la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD CONSTRAINT `empresa_ibfk_1` FOREIGN KEY (`fk_usuario`) REFERENCES `usuario` (`usuario_id`);

--
-- Filtros para la tabla `exportacion`
--
ALTER TABLE `exportacion`
  ADD CONSTRAINT `exportacion_ibfk_1` FOREIGN KEY (`fk_empresa`) REFERENCES `empresa` (`id_empresa`),
  ADD CONSTRAINT `exportacion_ibfk_2` FOREIGN KEY (`fk_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `exportacion_ibfk_3` FOREIGN KEY (`fk_pais`) REFERENCES `pais` (`id_pais`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`fk_rol`) REFERENCES `rol` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
