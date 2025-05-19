
-- Tiempo de generación: 19-05-2025 a las 07:38:33


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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Contenido`
--

CREATE TABLE `Contenido` (
  `id_contenido` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `modulo` varchar(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `tipo` enum('pdf','docx','odt','txt','xlsx','ods','pptx','odp','mp4','webm','avi','mp3','wav','jpg','jpeg','png','gif','svg','genially','canva','iframe','url') NOT NULL,
  `url` varchar(255) NOT NULL,
  `fecha_publicacion` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Contenido`
--

INSERT INTO `Contenido` (`id_contenido`, `id_curso`, `modulo`, `nombre`, `tipo`, `url`, `fecha_publicacion`) VALUES
(1, 3, '1', 'Informatica Basica', 'url', 'https://drive.google.com/file/d/1QweI-zJAP0A3C6YldW60U99i322Qe0k4/view?usp=drive_link', '2025-05-17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `CursoCredito`
--

CREATE TABLE `CursoCredito` (
  `id_curso` int(11) NOT NULL,
  `id_programa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `costo` decimal(10,2) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Cursos`
--

INSERT INTO `Cursos` (`id_curso`, `nombre_curso`, `descripcion`, `duracion`, `tipo`, `costo`, `fecha_inicio`, `fecha_fin`, `foto`) VALUES
(1, 'Carpintería', 'Este curso de carpintería está diseñado para enseñar desde lo básico hasta lo avanzado. Aprende a manejar las herramientas y técnicas más importantes para crear proyectos de carpintería con precisión y seguridad.', 60, 'capacitacion', 3000.00, '2025-05-06', '2025-07-06', NULL),
(2, 'Diseño', 'Para aquellos interesados en desarrollar habilidades en la creación y desarrollo de proyectos visuales impactantes. Aprenderás las herramientas y técnicas esenciales para diseñar piezas gráficas para una amplia gama de medios, desde impresos hasta digitales.', 45, 'gratuito', 8000.00, '2025-06-01', '2025-07-15', NULL),
(3, 'Informática', 'Dirigido a personas que desean aprender a utilizar las herramientas informáticas esenciales para la vida diaria, el trabajo y la educación. A través de este curso, adquirirás conocimientos fundamentales sobre el uso de la computadora, programas de oficina y navegación en internet, lo que te permitirá desenvolverte con confianza en un mundo digital.', 90, 'arancelado', 9000.00, '2025-05-15', '2025-08-15', NULL),
(4, 'Mecánica', 'Principios fundamentales de la reparación y mantenimiento de vehículos. Este curso te proporcionará las herramientas y conocimientos esenciales para entender el funcionamiento de los motores, los sistemas de transmisión, frenos, suspensión, y mucho más. Ya sea que busques aprender para uso personal o como base para una carrera en la mecánica, este curso es el primer paso hacia el mundo automotriz.', 75, 'capacitacion', 15000.00, '2025-06-10', '2025-08-24', NULL),
(5, 'Oratoria', 'Mejora tus habilidades de comunicación y aprende a expresarse de manera efectiva frente a cualquier tipo de audiencia. A lo largo de este curso, desarrollarás herramientas y técnicas para hablar con claridad, seguridad y persuasión, ya sea en presentaciones profesionales, exposiciones académicas o situaciones cotidianas donde se requiere hablar en público.', 30, 'gratuito', 20000.00, '2025-05-20', '2025-06-19', NULL),
(6, 'Pintura', 'Dirigido a todas las personas que deseen iniciarse en el arte de pintar o perfeccionar sus habilidades artísticas. A través de un enfoque práctico y dinámico, aprenderás a expresarte mediante el color, la forma y la técnica, explorando distintos estilos y materiales.\r\n            Durante el curso, desarrollarás tu creatividad, conocerás las bases del dibujo, el manejo del color y las técnicas esenciales para trabajar con acrílicos, óleos y acuarelas, adaptándote a tu propio estilo personal.', 40, 'arancelado', 20000.00, '2025-07-01', '2025-08-10', NULL),
(7, 'Administración', 'Ofrece una formación práctica y actualizada para quienes buscan adquirir o perfeccionar habilidades en la gestión de organizaciones. Aprenderás a planificar, organizar, dirigir y controlar recursos de manera eficiente, desarrollando una visión estratégica que te permita liderar proyectos, empresas o emprendimientos exitosamente.\r\n          Ideal para quienes desean fortalecer su perfil profesional, emprender o mejorar la gestión de sus negocios.', 60, 'capacitacion', 18000.00, '2025-05-10', '2025-07-10', NULL),
(8, 'Caligrafía', 'Para introducirte en el mundo de la escritura artística, combinando técnica y creatividad. Aprenderás a dominar distintos estilos caligráficos, mejorar tu trazo, desarrollar precisión y expresar tu estilo personal a través de la letra escrita. Es ideal tanto para principiantes como para quienes buscan perfeccionar su técnica en proyectos creativos, diseño, invitaciones, arte y más.', 20, 'gratuito', 12000.00, '2025-06-05', '2025-06-25', NULL),
(9, 'Manicuría', 'Te formarás en las técnicas esenciales para el cuidado y embellecimiento de manos y uñas. Aprenderás desde los conceptos básicos de higiene y preparación hasta las últimas tendencias en esmaltado, decoración y tratamientos de spa para manos. Ideal para quienes desean iniciar su propio emprendimiento o perfeccionar sus habilidades en el mundo de la estética.', 50, 'capacitacion', 15000.00, '2025-05-22', '2025-07-11', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `DocenteCurso`
--

CREATE TABLE `DocenteCurso` (
  `id_usuario` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(11, 2, 4, '2025-04-30'),
(12, 22, 2, '2025-05-14'),
(13, 22, 3, '2025-05-14'),
(14, 22, 8, '2025-05-14'),
(15, 22, 2, '2025-05-14'),
(16, 22, 9, '2025-05-14'),
(17, 22, 5, '2025-05-14'),
(18, 22, 5, '2025-05-14'),
(19, 22, 4, '2025-05-14'),
(20, 22, 1, '2025-05-14'),
(21, 22, 4, '2025-05-14'),
(22, 22, 6, '2025-05-14'),
(23, 22, 8, '2025-05-14'),
(24, 22, 3, '2025-05-16');

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
-- Volcado de datos para la tabla `Pagos`
--

INSERT INTO `Pagos` (`id_pago`, `id_usuario`, `id_curso`, `monto`, `fecha_pago`) VALUES
(1, 22, 1, 3000.00, '2025-05-14'),
(2, 22, 4, 15000.00, '2025-05-14'),
(3, 22, 6, 20000.00, '2025-05-14'),
(4, 22, 8, 12000.00, '2025-05-14'),
(5, 22, 3, 9000.00, '2025-05-16');

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
  `tipo_usuario` enum('alumno','docente') NOT NULL,
  `foto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Usuarios`
--

INSERT INTO `Usuarios` (`id_usuario`, `nombre`, `apellido`, `fecha_nacimiento`, `direccion`, `telefono`, `email`, `password`, `dni`, `especialidad`, `tipo_usuario`, `foto`) VALUES
(1, 'Juan', 'Pérez', '2000-01-01', 'villa maria 25', '311554687', 'juanPerez@gmail.com', 'youtube24', 12345678, '', 'alumno', NULL),
(2, 'ruth', 'Carlo', '1990-02-10', 'villa maria 5', '311554447', 'calom@gmail.com', 'youangri2', 34563233, '', 'alumno', NULL),
(3, 'Lucía', 'Martínez', '2005-04-12', 'Calle Falsa 123', '1123456789', 'luciaMartinez@gmail.com', 'lucia123', 40123456, NULL, 'alumno', NULL),
(4, 'Carlos', 'Gómez', '2004-10-22', 'Av. Rivadavia 456', '1134567890', 'carlosGomez@gmail.com', 'carlos123', 40234567, NULL, 'alumno', NULL),
(5, 'María', 'Fernández', '2006-01-15', 'Pasaje Sur 789', '1145678901', 'mariaFernandez@gmail.com', 'maria123', 40345678, NULL, 'alumno', NULL),
(6, 'Juan', 'Pérea', '2003-07-03', 'Ruta 3 Km 15', '1156789012', 'juanPerez2@gmail.com', 'juan12345', 40456789, NULL, 'alumno', NULL),
(7, 'Pedro', 'Suárez', '1980-01-15', 'Calle Talleres 123', '1161111111', 'pedroSuarez@gmail.com', 'pedro123', 31000001, 'Carpintería', 'docente', NULL),
(8, 'Laura Clara', 'Martínez', '1985-02-20', 'Av. Diseño 456', '1162222222', 'lauraMartinez2@gmail.com', 'laura123', 31000002, 'Diseño', 'docente', NULL),
(9, 'Marcelo', 'Ruiz', '1978-03-25', 'Calle Sistemas 789', '1163333333', 'marceloRuiz@gmail.com', 'marcelo123', 31000003, 'Informática', 'docente', NULL),
(10, 'Graciela luz', 'Fernández', '1975-04-10', 'Ruta 8 Nº 12', '1164444444', 'gracielaFernandezMar@gmail.com', 'graciela123', 31000004, 'Mecánica', 'docente', NULL),
(11, 'Andrés', 'Paz', '1982-05-30', 'Pasaje Central 333', '1165555555', 'andresPaz12@gmail.com', 'andres123', 31000005, 'Oratoria', 'docente', NULL),
(12, 'Valeria', 'Luna', '1979-06-14', 'Diagonal Norte 800', '1166666666', 'valeriaLuna@gmail.com', 'valeria123', 31000006, 'Pintura', 'docente', NULL),
(13, 'Esteban', 'Domínguez', '1983-07-22', 'Calle 12 Nº 2200', '1167777777', 'estebanDominguez33@gmail.com', 'esteban123', 31000007, 'Administración', 'docente', NULL),
(14, 'Carolina', 'Silva', '1981-08-19', 'Calle Letras 155', '1168888888', 'carolinaSilva@gmail.com', 'carolina123', 31000008, 'Caligrafía', 'docente', NULL),
(15, 'Javier', 'Torres', '1984-09-07', 'Av. Belleza 77', '1169999999', 'javierTorresCuvero@gmail.com', 'javier123', 31000009, 'Manicuría', 'docente', NULL),
(16, 'Luciana', 'Montañes', '1986-06-02', 'villa maria 196', '311569874', 'lucianaCruz@gmail.com', 'licia2000', 33564897, 'Pintura', 'docente', NULL),
(17, 'Juana', 'Maria', '1999-04-05', 'villa Maria 5767', '45565444', 'maria2025@gmail.com', 'passmaria', 42569784, 'Pintura', 'alumno', NULL),
(18, 'Ludmila', 'Palermo', '1999-06-03', 'La paz-Tucuman', '3115986632', 'Lusdmi25@gmail.com', 'li1234', 408569321, 'Pintura', 'docente', NULL),
(19, 'Josep ', 'Montañes', '1986-07-09', 'La Iliada-Cordoba', '3445785698', 'jo25montaar@gmail.com', 'josep999', 36789654, 'Mecanica', 'docente', NULL),
(20, 'lucas', 'Yamaha', '1965-09-08', 'la Sierra-La pampa', '3885294632', 'lica3333@gmail.com', 'lu122345', 26895674, 'Carpinteria', 'docente', NULL),
(21, 'Cristian', 'Peña', '1989-09-04', 'La cruz de laSierra', '3115967321', 'cri25025ar@gmail.com', 'cristian2025', 33596412, 'Caligrafia', 'docente', '/uploads/33596412_1746902468547.jpeg'),
(22, 'Cristiano', 'Peral Peña', '2003-08-07', 'el valle 28', '3445896214', 'Cristi24567@gmail.com', 'cri23romero', 40456978, '', 'alumno', '/uploads/40456978_1747093282657.jpg'),
(23, 'Leonardo', 'Castillo', '1985-05-04', 'Rosas 123 -Palermo', '3115896741', 'leonardoArg@gmail.com', '1236542123arg', 31456987, '', 'alumno', NULL);

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
-- Indices de la tabla `Contenido`
--
ALTER TABLE `Contenido`
  ADD PRIMARY KEY (`id_contenido`),
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
-- AUTO_INCREMENT de la tabla `Contenido`
--
ALTER TABLE `Contenido`
  MODIFY `id_contenido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `id_inscripcion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `Pagos`
--
ALTER TABLE `Pagos`
  MODIFY `id_pago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

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
-- Filtros para la tabla `Contenido`
--
ALTER TABLE `Contenido`
  ADD CONSTRAINT `Contenido_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `Cursos` (`id_curso`) ON DELETE CASCADE;

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
