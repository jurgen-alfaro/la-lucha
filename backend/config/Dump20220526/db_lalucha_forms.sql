CREATE DATABASE  IF NOT EXISTS `db_lalucha` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_lalucha`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: db_lalucha
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `forms`
--

DROP TABLE IF EXISTS `forms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forms` (
  `idforms` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(250) NOT NULL,
  `fdesc` varchar(350) NOT NULL,
  `fdoc` varchar(400) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idforms`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forms`
--

LOCK TABLES `forms` WRITE;
/*!40000 ALTER TABLE `forms` DISABLE KEYS */;
INSERT INTO `forms` VALUES (17,'Formulario de Suspensión de Servicio','Este formulario es necesario para cancelar la suscripción del servicio de agua potable con la ASADA.','EstebanHidalgoCV (1)-1648405342976.pdf','2022-03-17 04:58:56','2022-03-27 18:22:22'),(18,'Formulario nuevo','Este formulario es necesario para realizar equis trámite con la aseguradora de la ASADA la cual le permitirá al abonado solicitar el servicio de agua potable...','Coach Luis K Rutina Avanzada #2 Jurgen-1647493231791.pdf','2022-03-17 05:00:31','2022-05-14 01:25:48'),(20,'Formulario de Solicitud de Agua','Este formulario es necesario para solicitar a la ASADA el inicio de servicio de agua potable. ','pathways-1647543388870.pdf','2022-03-17 18:56:28','2022-03-21 19:18:46'),(21,'Formulario de Suspensión de Servicio','Informacion sobre el reglamento y que se yo del suspensiond el servicio','Seguimiento Nutricional #1 Jurgen Alfaro-1648361064515.pdf','2022-03-27 06:04:24','2022-03-27 06:04:24'),(23,'Solicitud de Recepción de Obras','Este documento contiene un infograma sobre cómo tramitar una recepción de obras. ','Solicitud de recepción de obras-1653446220833.pdf','2022-05-25 02:37:00','2022-05-25 02:37:00');
/*!40000 ALTER TABLE `forms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-26 11:35:54
