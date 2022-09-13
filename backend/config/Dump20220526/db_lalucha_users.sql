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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `iduser` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`iduser`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jurgen','$2a$10$9CC1EU5LcYvU96ANXN9hnORCOY8stZeC.a7rfJ4HuPPZ6bIfj7pfG','jurgen@gmail.com','2022-03-01 02:23:39','2022-04-01 16:10:55'),(7,'Brad','$2a$10$wXhApiHG2JKepLPDka7i9eEty46dw5/H9gb62RNQGLKfIgo/no4Ci','brad@traversy.com','2022-03-01 02:40:11','2022-03-01 02:40:11'),(8,'Jurgen','$2a$10$M6uME0wFSjMUXiWy1NjJ3.t0HsYIFHp8Eg5xT8bM7sbdP22WgLAdC','jurgen@alfaro.com','2022-03-01 02:43:29','2022-03-01 02:43:29'),(9,'Kevin','$2a$10$xY7RdCPn3m0.9kcibmM/wOLM942oycOQ12JiD5EduiueV9CauAfGe','kevin@alfaro.com','2022-03-01 02:50:13','2022-03-01 02:50:13'),(10,'Jordan','$2a$10$.cSiipNAfYe/2OXr70mmVu./fZnG9wsPl2CxXkHC7moxeYRd9ZpOC','jordan@alfaro.com','2022-03-01 02:52:51','2022-03-01 02:52:51'),(11,'Belfort','$2a$10$yTv4QcqS1NOxXV8sAGHYje7WvBec.l9YIYJKJqpy/bjF/3oT28nYS','belfort@alfaro.com','2022-03-01 02:53:32','2022-03-01 02:53:32'),(12,'Ana','$2a$10$50gXQFOKFFGjXhKz/gfOTehsgScDQszdkC9dZGTo/J2tR5YsYkvgO','ana@alfaro.com','2022-03-01 02:54:10','2022-03-01 02:54:10'),(13,'Jhon','$2a$10$DOZJBja3OyCyN6nh9Q3/3.udSSozXBHM.3xQY.9C0sd6Qc7lrRt.i','Jhon@doe.com','2022-03-01 03:06:58','2022-03-01 03:06:58'),(14,'Jorge','$2a$10$Jk49q.h2kIlASPxhZbeZMOVQhKbJDx8UMSrf0WM30VvcSPXDDdKmm','jorge@email.com','2022-04-01 03:57:48','2022-04-01 17:25:41'),(15,'goldin','$2a$10$V5nQEenaae8CShyuroy4j.oXuxJFVFjTwOuk/0I5E4GlxnrUlYveK','goldin@gmail.com','2022-04-01 04:04:29','2022-04-01 04:04:29'),(16,'Norman','$2a$10$Z7d6LQD2xpy1d52.09if4.jPVxXO8l/fVw3E276yugAFODRhYMYX.','norman@hotmail.com','2022-04-01 04:41:26','2022-04-01 04:41:26');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
