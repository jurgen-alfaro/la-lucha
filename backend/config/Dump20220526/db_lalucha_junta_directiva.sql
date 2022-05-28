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
-- Table structure for table `junta_directiva`
--

DROP TABLE IF EXISTS `junta_directiva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `junta_directiva` (
  `idmember` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `position` varchar(100) NOT NULL,
  `vigency` varchar(30) NOT NULL,
  `photo` varchar(400) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idmember`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `junta_directiva`
--

LOCK TABLES `junta_directiva` WRITE;
/*!40000 ALTER TABLE `junta_directiva` DISABLE KEYS */;
INSERT INTO `junta_directiva` VALUES (3,'Saúl','Ballestero Gómez','Presidente','2029-08-01','WhatsApp Image 2022-05-26 at 9.30.24 AM.jpeg','2022-03-30 19:39:37','2022-05-26 15:37:43'),(4,'Humberto ','Gutiérrez Gutiérrez','Vice Presidente','2025-08-21','1911514b-5921-4866-bd4c-466b39c3e55a.jpg','2022-03-30 19:42:49','2022-05-19 21:47:34'),(5,'Vanessa ','Blanco Blanco','Secretario(a)','2026-02-03T00:00:00.000Z','1983718d-8b0c-40d2-b4f3-4c93aaff46aa.jpg','2022-03-30 19:44:35','2022-05-19 21:48:29'),(6,'Giovany','Thomas Mendez','Vocal 1','2025-04-29T00:00:00.000Z','pexels-andrea-bova-2883383.jpg','2022-03-30 19:46:03','2022-05-26 15:38:18'),(10,'Dagoberto','Ruiz Mendez','Vocal 1','2025-06-17T00:00:00.000Z','244752016_3070558486501056_2677616507642398380_n.jpg','2022-03-31 21:30:34','2022-05-26 15:39:08'),(12,'Asunto','Cimplemto','Vocal 2','2022-04-09T00:00:00.000Z','pexels-andrea-piacquadio.jpg','2022-03-31 21:40:16','2022-03-31 22:30:49');
/*!40000 ALTER TABLE `junta_directiva` ENABLE KEYS */;
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
