
-- Tiempo de generación: 07-05-2025 a las 14:53:43

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `NOC`
--
CREATE DATABASE IF NOT EXISTS `NOC` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `NOC`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Asistencia`
--

CREATE TABLE `Asistencia` (
  `id_asistencia` int(11) NOT NULL,
  `id_inscripcion` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `estado` enum('presente','ausente','justificado') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `Asistencia`:
--   `id_inscripcion`
--       `Inscripciones` -> `id_inscripcion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `CondicionesAprobacion`
--

CREATE TABLE `CondicionesAprobacion` (
  `id_condicion` int(11) NOT NULL,
  `id_curso` int(11) DEFAULT NULL,
  `asistencia_minima` int(11) DEFAULT NULL,
  `nota_minima` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `CondicionesAprobacion`:
--   `id_curso`
--       `Cursos` -> `id_curso`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `CursoCredito`
--

CREATE TABLE `CursoCredito` (
  `id_curso` int(11) NOT NULL,
  `id_programa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `CursoCredito`:
--   `id_curso`
--       `Cursos` -> `id_curso`
--   `id_programa`
--       `ProgramasCredito` -> `id_programa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Cursos`
--

CREATE TABLE `Cursos` (
  `id_curso` int(11) NOT NULL,
  `nombre_curso` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `duracion` int(11) DEFAULT NULL,
  `tipo` enum('gratuito','arancelado','capacitacion','entrenamiento') DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `Cursos`:
--

--
-- Volcado de datos para la tabla `Cursos`
--

INSERT INTO `Cursos` (`id_curso`, `nombre_curso`, `descripcion`, `duracion`, `tipo`, `fecha_inicio`, `fecha_fin`) VALUES
(1, 'Carpintería', 'Curso básico de carpintería para principiantes.', 60, 'capacitacion', '2025-05-06', '2025-07-06'),
(2, 'Diseño', 'Introducción al diseño gráfico digital.', 45, 'gratuito', '2025-06-01', '2025-07-15'),
(3, 'Informática', 'Fundamentos de informática y uso de sistemas operativos.', 90, 'arancelado', '2025-05-15', '2025-08-15'),
(4, 'Mecánica', 'Taller práctico de mecánica automotriz.', 75, 'capacitacion', '2025-06-10', '2025-08-24'),
(5, 'Oratoria', 'Curso de oratoria y expresión verbal en público.', 30, 'gratuito', '2025-05-20', '2025-06-19'),
(6, 'Pintura', 'Técnicas básicas de pintura artística y muralismo.', 40, 'arancelado', '2025-07-01', '2025-08-10'),
(7, 'Administración', 'Conceptos básicos de administración de empresas.', 60, 'capacitacion', '2025-05-10', '2025-07-10'),
(8, 'Caligrafía', 'Curso de caligrafía y escritura estética.', 20, 'gratuito', '2025-06-05', '2025-06-25'),
(9, 'Manicuría', 'Formación en técnicas de manicuría y cuidado de uñas.', 50, 'capacitacion', '2025-05-22', '2025-07-11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `DocenteCurso`
--

CREATE TABLE `DocenteCurso` (
  `id_usuario` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `DocenteCurso`:
--   `id_curso`
--       `Cursos` -> `id_curso`
--   `id_usuario`
--       `Usuarios` -> `id_usuario`
--

--
-- Volcado de datos para la tabla `DocenteCurso`
--

INSERT INTO `DocenteCurso` (`id_usuario`, `id_curso`) VALUES
(7, 1),
(8, 2),
(9, 3),
(10, 4),
(11, 5),
(12, 6),
(13, 7),
(14, 8),
(15, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Empresas`
--

CREATE TABLE `Empresas` (
  `id_empresa` int(11) NOT NULL,
  `nombre_empresa` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `contacto_nombre` varchar(100) DEFAULT NULL,
  `contacto_email` varchar(100) DEFAULT NULL,
  `contacto_telefono` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `Empresas`:
--

--
-- Volcado de datos para la tabla `Empresas`
--

INSERT INTO `Empresas` (`id_empresa`, `nombre_empresa`, `descripcion`, `contacto_nombre`, `contacto_email`, `contacto_telefono`) VALUES
(1, 'Santex Technologies', 'Empresa global que ofrece soluciones de desarrollo de software a medida y consultoría en IT, con experiencia en empresas multinacionales.', 'Luis Martínez', 'luis.martinez@santexgroup.com', '1166789012'),
(2, 'Xacademy Partners', 'Plataforma educativa dedicada a la formación de desarrolladores, con programas intensivos en tecnología y metodologías ágiles.', 'Ana Gómez', 'ana.gomez@xacademy.com', '1167890123'),
(3, 'DevSolutions', 'Proveedor de soluciones tecnológicas a medida, especializados en desarrollo de aplicaciones para empresas de diferentes sectores.', 'Carlos Rodríguez', 'carlos.rodriguez@devsolutions.com', '1168901234'),
(4, 'TechLabs', 'Red de incubadoras de startups en el ámbito tecnológico, impulsando el crecimiento de nuevas empresas en el sector digital y software.', 'Javier Pérez', 'javier.perez@techlabs.com', '1169012345'),
(5, 'Innovative IT', 'Consultoría en transformación digital y desarrollo de plataformas tecnológicas para mejorar la eficiencia empresarial.', 'Laura Martínez', 'laura.martinez@innovativeit.com', '1169123456');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `EntrenamientosLaborales`
--

CREATE TABLE `EntrenamientosLaborales` (
  `id_entrenamiento` int(11) NOT NULL,
  `nombre_entrenamiento` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `empresa_id` int(11) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `EntrenamientosLaborales`:
--   `empresa_id`
--       `Empresas` -> `id_empresa`
--

--
-- Volcado de datos para la tabla `EntrenamientosLaborales`
--

INSERT INTO `EntrenamientosLaborales` (`id_entrenamiento`, `nombre_entrenamiento`, `descripcion`, `empresa_id`, `fecha_inicio`, `fecha_fin`) VALUES
(1, 'Entrenamiento en React', 'Curso intensivo de React para desarrolladores frontend.', 1, '2025-06-01', '2025-06-15'),
(2, 'Bootcamp Fullstack', 'Entrenamiento fullstack con Node.js y Angular.', 2, '2025-07-01', '2025-07-30'),
(3, 'Capacitación en Bases de Datos', 'MySQL, modelado de datos y optimización de consultas.', 1, '2025-08-10', '2025-08-20'),
(4, 'DevOps Essentials', 'Automatización, integración continua y despliegue.', 2, '2025-09-01', '2025-09-15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Inscripciones`
--

CREATE TABLE `Inscripciones` (
  `id_inscripcion` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_curso` int(11) DEFAULT NULL,
  `fecha_inscripcion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `Inscripciones`:
--   `id_curso`
--       `Cursos` -> `id_curso`
--   `id_usuario`
--       `Usuarios` -> `id_usuario`
--

--
-- Volcado de datos para la tabla `Inscripciones`
--

INSERT INTO `Inscripciones` (`id_inscripcion`, `id_usuario`, `id_curso`, `fecha_inscripcion`) VALUES
(1, 1, 1, '2025-04-10'),
(2, 2, 3, '2025-04-11'),
(3, 3, 5, '2025-04-12'),
(4, 4, 2, '2025-04-13'),
(5, 5, 4, '2025-04-14'),
(6, 6, 6, '2025-04-15'),
(7, 7, 7, '2025-04-16'),
(8, 1, 2, '2025-04-30'),
(9, 1, 2, '2025-04-30'),
(10, 2, 4, '2025-04-30'),
(11, 2, 4, '2025-04-30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Pagos`
--

CREATE TABLE `Pagos` (
  `id_pago` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_curso` int(11) DEFAULT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `fecha_pago` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `Pagos`:
--   `id_curso`
--       `Cursos` -> `id_curso`
--   `id_usuario`
--       `Usuarios` -> `id_usuario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ProgramasCredito`
--

CREATE TABLE `ProgramasCredito` (
  `id_programa` int(11) NOT NULL,
  `nombre_programa` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `tasa_interes` decimal(5,2) DEFAULT NULL,
  `duracion` int(11) DEFAULT NULL,
  `requisitos` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `ProgramasCredito`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Publicaciones`
--

CREATE TABLE `Publicaciones` (
  `id_publicacion` int(11) NOT NULL,
  `titulo` varchar(200) DEFAULT NULL,
  `contenido` text DEFAULT NULL,
  `fecha_publicacion` date DEFAULT NULL,
  `tipo` enum('curso','capacitacion','entrenamiento') DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `Publicaciones`:
--

--
-- Volcado de datos para la tabla `Publicaciones`
--

INSERT INTO `Publicaciones` (`id_publicacion`, `titulo`, `contenido`, `fecha_publicacion`, `tipo`, `estado`) VALUES
(1, 'Curso de Node.js con Sequelize', 'Aprende a desarrollar APIs REST con Node y Sequelize.', '2025-05-01', 'curso', 'activo'),
(2, 'Capacitación en Angular', 'Frontend avanzado con Angular y consumo de APIs.', '2025-05-02', 'capacitacion', 'activo'),
(3, 'Entrenamiento Fullstack', 'Entrenamiento intensivo para desarrolladores fullstack.', '2025-05-03', 'entrenamiento', 'inactivo'),
(4, 'Curso de MySQL Avanzado', 'Profundiza en consultas complejas y optimización.', '2025-05-04', 'curso', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuarios`
--

CREATE TABLE `Usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(150) NOT NULL,
  `dni` int(11) DEFAULT NULL,
  `especialidad` varchar(100) DEFAULT NULL,
  `tipo_usuario` enum('alumno','docente') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `Usuarios`:
--

--
-- Volcado de datos para la tabla `Usuarios`
--

INSERT INTO `Usuarios` (`id_usuario`, `nombre`, `apellido`, `fecha_nacimiento`, `direccion`, `telefono`, `email`, `password`, `dni`, `especialidad`, `tipo_usuario`) VALUES
(1, 'Juan', 'Pérez', '2000-01-01', 'villa maria 25', '311554687', 'juanPerez@gmail.com', 'youtube24', 12345678, '', 'alumno'),
(2, 'ruth', 'Carlo', '1990-02-10', 'villa maria 5', '311554447', 'calom@gmail.com', 'youangri2', 34563233, '', 'alumno'),
(3, 'Lucía', 'Martínez', '2005-04-12', 'Calle Falsa 123', '1123456789', 'luciaMartinez@gmail.com', 'lucia123', 40123456, NULL, 'alumno'),
(4, 'Carlos', 'Gómez', '2004-10-22', 'Av. Rivadavia 456', '1134567890', 'carlosGomez@gmail.com', 'carlos123', 40234567, NULL, 'alumno'),
(5, 'María', 'Fernández', '2006-01-15', 'Pasaje Sur 789', '1145678901', 'mariaFernandez@gmail.com', 'maria123', 40345678, NULL, 'alumno'),
(6, 'Juan', 'Pérea', '2003-07-03', 'Ruta 3 Km 15', '1156789012', 'juanPerez2@gmail.com', 'juan12345', 40456789, NULL, 'alumno'),
(7, 'Pedro', 'Suárez', '1980-01-15', 'Calle Talleres 123', '1161111111', 'pedroSuarez@gmail.com', 'pedro123', 31000001, 'Carpintería', 'docente'),
(8, 'Laura Clara', 'Martínez', '1985-02-20', 'Av. Diseño 456', '1162222222', 'lauraMartinez2@gmail.com', 'laura123', 31000002, 'Diseño', 'docente'),
(9, 'Marcelo', 'Ruiz', '1978-03-25', 'Calle Sistemas 789', '1163333333', 'marceloRuiz@gmail.com', 'marcelo123', 31000003, 'Informática', 'docente'),
(10, 'Graciela luz', 'Fernández', '1975-04-10', 'Ruta 8 Nº 12', '1164444444', 'gracielaFernandezMar@gmail.com', 'graciela123', 31000004, 'Mecánica', 'docente'),
(11, 'Andrés', 'Paz', '1982-05-30', 'Pasaje Central 333', '1165555555', 'andresPaz12@gmail.com', 'andres123', 31000005, 'Oratoria', 'docente'),
(12, 'Valeria', 'Luna', '1979-06-14', 'Diagonal Norte 800', '1166666666', 'valeriaLuna@gmail.com', 'valeria123', 31000006, 'Pintura', 'docente'),
(13, 'Esteban', 'Domínguez', '1983-07-22', 'Calle 12 Nº 2200', '1167777777', 'estebanDominguez33@gmail.com', 'esteban123', 31000007, 'Administración', 'docente'),
(14, 'Carolina', 'Silva', '1981-08-19', 'Calle Letras 155', '1168888888', 'carolinaSilva@gmail.com', 'carolina123', 31000008, 'Caligrafía', 'docente'),
(15, 'Javier', 'Torres', '1984-09-07', 'Av. Belleza 77', '1169999999', 'javierTorresCuvero@gmail.com', 'javier123', 31000009, 'Manicuría', 'docente'),
(16, 'Luciana', 'Montañes', '1986-06-02', 'villa maria 196', '311569874', 'lucianaCruz@gmail.com', 'licia2000', 33564897, 'Pintura', 'docente'),
(17, 'Juana', 'Maria', '1999-04-05', 'villa Maria 5767', '45565444', 'maria2025@gmail.com', 'passmaria', 42569784, 'Pintura', 'alumno');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Asistencia`
--
ALTER TABLE `Asistencia`
  ADD PRIMARY KEY (`id_asistencia`),
  ADD KEY `id_inscripcion` (`id_inscripcion`);

--
-- Indices de la tabla `CondicionesAprobacion`
--
ALTER TABLE `CondicionesAprobacion`
  ADD PRIMARY KEY (`id_condicion`),
  ADD KEY `id_curso` (`id_curso`);

--
-- Indices de la tabla `CursoCredito`
--
ALTER TABLE `CursoCredito`
  ADD PRIMARY KEY (`id_curso`,`id_programa`),
  ADD KEY `id_programa` (`id_programa`);

--
-- Indices de la tabla `Cursos`
--
ALTER TABLE `Cursos`
  ADD PRIMARY KEY (`id_curso`);

--
-- Indices de la tabla `DocenteCurso`
--
ALTER TABLE `DocenteCurso`
  ADD PRIMARY KEY (`id_usuario`,`id_curso`),
  ADD KEY `id_curso` (`id_curso`);

--
-- Indices de la tabla `Empresas`
--
ALTER TABLE `Empresas`
  ADD PRIMARY KEY (`id_empresa`);

--
-- Indices de la tabla `EntrenamientosLaborales`
--
ALTER TABLE `EntrenamientosLaborales`
  ADD PRIMARY KEY (`id_entrenamiento`),
  ADD KEY `empresa_id` (`empresa_id`);

--
-- Indices de la tabla `Inscripciones`
--
ALTER TABLE `Inscripciones`
  ADD PRIMARY KEY (`id_inscripcion`),
  ADD KEY `id_curso` (`id_curso`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `Pagos`
--
ALTER TABLE `Pagos`
  ADD PRIMARY KEY (`id_pago`),
  ADD KEY `id_curso` (`id_curso`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `ProgramasCredito`
--
ALTER TABLE `ProgramasCredito`
  ADD PRIMARY KEY (`id_programa`);

--
-- Indices de la tabla `Publicaciones`
--
ALTER TABLE `Publicaciones`
  ADD PRIMARY KEY (`id_publicacion`);

--
-- Indices de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Asistencia`
--
ALTER TABLE `Asistencia`
  MODIFY `id_asistencia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `CondicionesAprobacion`
--
ALTER TABLE `CondicionesAprobacion`
  MODIFY `id_condicion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Cursos`
--
ALTER TABLE `Cursos`
  MODIFY `id_curso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `Empresas`
--
ALTER TABLE `Empresas`
  MODIFY `id_empresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `EntrenamientosLaborales`
--
ALTER TABLE `EntrenamientosLaborales`
  MODIFY `id_entrenamiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `Inscripciones`
--
ALTER TABLE `Inscripciones`
  MODIFY `id_inscripcion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `Pagos`
--
ALTER TABLE `Pagos`
  MODIFY `id_pago` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ProgramasCredito`
--
ALTER TABLE `ProgramasCredito`
  MODIFY `id_programa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Publicaciones`
--
ALTER TABLE `Publicaciones`
  MODIFY `id_publicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Asistencia`
--
ALTER TABLE `Asistencia`
  ADD CONSTRAINT `Asistencia_ibfk_1` FOREIGN KEY (`id_inscripcion`) REFERENCES `Inscripciones` (`id_inscripcion`);

--
-- Filtros para la tabla `CondicionesAprobacion`
--
ALTER TABLE `CondicionesAprobacion`
  ADD CONSTRAINT `CondicionesAprobacion_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `Cursos` (`id_curso`);

--
-- Filtros para la tabla `CursoCredito`
--
ALTER TABLE `CursoCredito`
  ADD CONSTRAINT `CursoCredito_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `Cursos` (`id_curso`),
  ADD CONSTRAINT `CursoCredito_ibfk_2` FOREIGN KEY (`id_programa`) REFERENCES `ProgramasCredito` (`id_programa`);

--
-- Filtros para la tabla `DocenteCurso`
--
ALTER TABLE `DocenteCurso`
  ADD CONSTRAINT `DocenteCurso_ibfk_2` FOREIGN KEY (`id_curso`) REFERENCES `Cursos` (`id_curso`),
  ADD CONSTRAINT `DocenteCurso_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios` (`id_usuario`);

--
-- Filtros para la tabla `EntrenamientosLaborales`
--
ALTER TABLE `EntrenamientosLaborales`
  ADD CONSTRAINT `EntrenamientosLaborales_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `Empresas` (`id_empresa`);

--
-- Filtros para la tabla `Inscripciones`
--
ALTER TABLE `Inscripciones`
  ADD CONSTRAINT `Inscripciones_ibfk_2` FOREIGN KEY (`id_curso`) REFERENCES `Cursos` (`id_curso`),
  ADD CONSTRAINT `Inscripciones_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios` (`id_usuario`);

--
-- Filtros para la tabla `Pagos`
--
ALTER TABLE `Pagos`
  ADD CONSTRAINT `Pagos_ibfk_2` FOREIGN KEY (`id_curso`) REFERENCES `Cursos` (`id_curso`),
  ADD CONSTRAINT `Pagos_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
