CREATE DATABASE  IF NOT EXISTS `asadalaluchalave_db_lalucha` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `asadalaluchalave_db_lalucha`;
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
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `idjobs` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `curriculum` varchar(400) NOT NULL,
  `is_pending` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idjobs`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (1,'Jurgen','Alfaro','jurgen@email.com','61118011','Jurgen_Alfaro_Resume-1647574428948.pdf',0,'2022-03-18 03:33:48','2022-03-27 06:09:26'),(2,'Jurgen','Alfaro','jurgen@email.com','61118011','Jurgen_Alfaro_Resume-1647574463598.pdf',1,'2022-03-18 03:34:23','2022-03-18 03:34:23'),(3,'Esteban','Hidalgo','esteban@gmail.com','88662244','EstebanHidalgoCV-2022-1647586421675.pdf',1,'2022-03-18 06:53:41','2022-03-18 06:53:41'),(4,'Kevin','Zamora','kevin@hotmail.com','88755500','git-training-v1-final1-1647586531904.pdf',1,'2022-03-18 06:55:31','2022-03-18 06:55:31'),(5,'Maria Jose','Garcia','maria@email.com','22115588','Seguimiento Nutricional #2 Jurgen Alfaro-1647673375413.pdf',0,'2022-03-19 07:02:55','2022-03-21 19:31:49'),(6,'Giovany','Dos Santos','giodos@santos.com','88779966','pathways-1647839603454.pdf',0,'2022-03-21 05:13:23','2022-03-21 16:14:38'),(7,'Hugo','Fonseca','hugo@email.com','78965412','Jurgen_Alfaro_Resume (1)-1647839822198.pdf',1,'2022-03-21 05:17:02','2022-03-24 21:50:35'),(8,'Walter','Mendez','wmendez@gmail.com','12356478','Seguimiento Nutricional #2 Jurgen Alfaro-1647839932985.pdf',0,'2022-03-21 05:18:52','2022-03-21 15:46:41'),(9,'asdfas','asdfasdf','asd@gasd.com','1231231','EstebanHidalgoCV-2022-1648225028918.pdf',1,'2022-03-25 16:17:08','2022-05-25 04:00:38'),(10,'aasdf','asdfasdf','jureg@asdf.com','123123123','Jurgen_Alfaro_Resume_-1648225077446.pdf',1,'2022-03-25 16:17:57','2022-05-25 05:08:05'),(11,'asdasd','asdasd','jur@gaklsd.com','123123451','Alfaro Morera Jurguen-M1-G9-1648225197973.pdf',1,'2022-03-25 16:19:57','2022-05-25 03:41:04');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-26 11:35:53
