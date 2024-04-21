-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: todolist_db
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` varchar(45) NOT NULL,
  `title` varchar(150) DEFAULT NULL,
  `itemContent` mediumtext,
  `isComplete` tinyint(1) DEFAULT '0',
  `created` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES ('305c284e-783b-44a4-824c-6651502652ac','Learn TypeScript','Understand how to use TypeScript for static typing in JavaScript',0,'2024-04-21'),('8e7c08a4-748c-4dfb-b17b-d0b29d79846e','Learn Angular','Understand how to use Angular for front-end development',0,'2024-04-21'),('a4cdc77e-0e9f-4192-a66c-148dba4bb6fb','Learn Node.js','Understand how to use Node.js for back-end development',0,'2024-04-21'),('bf421501-f87f-4f76-9f25-fd0675ae418f','Learn MySQL','Understand how to use MySQL for storing and retrieving data',1,'2024-04-20'),('c5a82026-edc8-4968-aa82-0bd2a9096201','Learn Postman','Understand how to use Postman for API testing',0,'2024-04-20'),('e93a7447-dc2b-490c-8822-140e6fda2edd','Learn MongoDB','Understand how to use MongoDB for storing and retrieving data',0,'2024-04-21'),('e9d870bb-c972-41c1-a2c7-32a39cbc97df','Learn Express.js','Understand how to use Express.js for creating web application back-end in Node.js',0,'2024-04-21'),('fc063487-71d1-43da-9b1e-927c57b57a7d','Apprendre MongoDB','Comprendre comment utiliser MongoDB pour stocker et récupérer des données. Se familiariser avec les concepts de bases de données NoSQL, les collections, les documents et les requêtes. Réaliser des exercices pratiques pour créer, lire, mettre à jour et supprimer des données (opérations CRUD). Explorer les fonctionnalités avancées telles que l\'agrégation et l\'indexation pour optimiser les performances des requêtes.',0,'2024-04-22');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-22  0:33:34
