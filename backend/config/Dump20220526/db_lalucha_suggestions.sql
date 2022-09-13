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
-- Table structure for table `suggestions`
--

DROP TABLE IF EXISTS `suggestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suggestions` (
  `idsuggestions` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `last_name` varchar(70) NOT NULL,
  `email` varchar(70) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `message` varchar(500) NOT NULL,
  `is_pending` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idsuggestions`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suggestions`
--

LOCK TABLES `suggestions` WRITE;
/*!40000 ALTER TABLE `suggestions` DISABLE KEYS */;
INSERT INTO `suggestions` VALUES (1,'Jurgen','Alfaro','jurgen@email.com','Este es un asunto de prueba','Este es un mensaje de prueba para insercion en MySQL',0,'2022-03-02 18:54:10','2022-05-26 05:55:57'),(2,'Kevin','Zamora','kevin@email.com','Este es un asunto de prueba de Kevin','Kevin esta sugiriendo algo',0,'2022-03-02 18:56:37','2022-03-10 17:10:38'),(3,'Viviana','Alfaro','vivi@email.com','Otro asunto distinto','Nueva sugerencia sobre...',0,'2022-03-02 18:57:46','2022-03-11 21:32:50'),(4,'Viviana','Alfaro','vivi@email.com','Otro asunto distinto','Nueva sugerencia sobre...',1,'2022-03-02 18:59:12','2022-03-21 05:33:02'),(5,'Viviana','Alfaro','vivi@email.com','Otro asunto distinto','Nueva sugerencia sobre...',1,'2022-03-02 18:59:33','2022-05-25 05:07:38'),(6,'Viviana','Alfaro','vivi@email.com','Otro asunto distinto','Nueva sugerencia sobre...',0,'2022-03-02 19:00:14','2022-03-09 05:36:00'),(7,'Viviana','Alfaro','vivi@email.com','Otro asunto distinto','Nueva sugerencia sobre...',1,'2022-03-02 19:01:37','2022-03-02 19:01:37'),(8,'Viviana','Alfaro','vivi@email.com','Otro asunto distinto','Nueva sugerencia sobre...',0,'2022-03-02 19:01:49','2022-03-08 03:23:22'),(9,'Viviana','Alfaro','vivi@email.com','Otro asunto distinto','Nueva sugerencia sobre...',0,'2022-03-02 19:05:05','2022-03-16 20:14:52'),(10,'Viviana','Alfaro','vivi@email.com','Otro asunto distinto','Nueva sugerencia sobre...',0,'2022-03-02 19:06:06','2022-03-09 05:21:40'),(11,'Viviana','Alfaro','vivi@email.com','Otro asunto distinto','Nueva sugerencia sobre...',0,'2022-03-02 19:06:39','2022-03-09 05:51:46'),(12,'Viviana','Alfaro','vivi@email.com','Otro asunto distinto','Nueva sugerencia sobre...',1,'2022-03-02 19:07:06','2022-03-02 19:07:06'),(13,'Tomas','White','tom@white.com','Test from front end','A test message from the front end',0,'2022-03-02 22:38:59','2022-03-17 04:45:01'),(14,'Maria','Garcia','majo@gmail.com','Asunto de Maria','Mensaje de Maria ',0,'2022-03-02 23:51:03','2022-03-12 05:58:37'),(15,'Jurgen','Garcia','jakuken23@gmail.com','Frustrado','Muy dificil react routing stuff',0,'2022-03-03 02:32:53','2022-03-09 05:29:20'),(16,'Brandon','Miller','dev.jurgen.alfaro@gmail.com','Test from front end','Ojala alguna no',0,'2022-03-03 05:20:31','2022-03-08 20:58:08'),(17,'Rodolfo','Zambrano','rozam@gmail.com','Agradecimiento','Agradezco por su ayuda en tal asunto en la zona de La Tigra. ¡Gracias!',0,'2022-03-04 05:37:41','2022-03-11 06:58:51'),(18,'Minor','Gutierrez','minor@email.com','Algun asunto','Mensaje',0,'2022-03-10 01:29:32','2022-03-10 16:49:35'),(19,'Ana','Zúñiga','ana@email.com','Algun asunto','Mensaje del asunto',0,'2022-03-17 18:36:23','2022-03-17 18:36:59');
/*!40000 ALTER TABLE `suggestions` ENABLE KEYS */;
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
