-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: COP4331
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Contacts`
--

DROP TABLE IF EXISTS `Contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Contacts` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL DEFAULT '',
  `Phone` varchar(50) NOT NULL DEFAULT '',
  `Email` varchar(50) NOT NULL DEFAULT '',
  `UserID` int NOT NULL DEFAULT '0',
  `DateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contacts`
--

LOCK TABLES `Contacts` WRITE;
/*!40000 ALTER TABLE `Contacts` DISABLE KEYS */;
INSERT INTO `Contacts` VALUES (3,'jeff test','9874594837','test@email.com',0,'2022-05-29 13:07:09'),(5,'James Woof','555-555-5555','James@woof.bark',26,'2022-05-29 13:07:09'),(6,'James Woof','555-555-5555','James@woof.bark',26,'2022-05-29 13:07:09'),(7,'James Woof','555-555-5555','James@woof.bark',26,'2022-05-29 13:07:09'),(8,'James Woof','555-555-5555','James@woof.bark',26,'2022-05-29 13:07:09'),(9,'James Woof','555-555-5555','James@woof.bark',26,'2022-05-29 13:07:09'),(10,'James Woof','555-555-5555','James@woof.bark',26,'2022-05-29 13:07:09'),(11,'mary tester','9879834758','test@mary.com',-1,'2022-05-29 13:07:09'),(12,'Greg Bergs','9832479874','greg@email.com',28,'2022-05-29 13:07:09'),(13,'becky grey','9843759837','becks@email.com',28,'2022-05-29 13:07:09'),(14,'joes person','9879857398','joe@person.com',28,'2022-05-29 13:07:09'),(15,'Marsh Test','8436876348','test@marsh.com',28,'2022-05-29 13:55:02'),(16,'Test User','7439857345','test@test.com',34,'2022-05-29 14:25:15'),(17,'Jenny','9879834757','jhsrfgrg@fff.com',35,'2022-05-29 15:30:47');
/*!40000 ALTER TABLE `Contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `DateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DateLastLoggedIn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `FirstName` varchar(50) NOT NULL DEFAULT '',
  `LastName` varchar(50) NOT NULL DEFAULT '',
  `Login` varchar(50) NOT NULL DEFAULT '',
  `Password` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'2022-05-22 21:45:03','2022-05-22 21:45:03','Rick','Leinecker','RickL','COP4331'),(2,'2022-05-22 21:46:18','2022-05-22 21:46:18','Sam','Hill','SamH','Test'),(3,'2022-05-22 21:46:44','2022-05-22 21:46:44','Rick','Leinecker','RickL','5832a71366768098cceb7095efb774f2'),(4,'2022-05-22 21:46:52','2022-05-22 21:46:52','Sam','Hill','SamH','0cbc6611f5540bd0809a388dc95a615b'),(5,'2022-05-29 02:07:40','2022-05-29 02:07:40','Franco','Molina','Testie','Test'),(6,'2022-05-29 02:09:00','2022-05-29 02:09:00','Franco','Molina','Testie','Test'),(7,'2022-05-29 02:09:02','2022-05-29 02:09:02','Franco','Molina','Testie','Test'),(8,'2022-05-29 02:09:46','2022-05-29 02:09:46','Franco','Molina','Testie','Test'),(9,'2022-05-29 02:09:59','2022-05-29 02:09:59','Franco','Molina','Testie','Test'),(10,'2022-05-29 02:10:01','2022-05-29 02:10:01','Franco','Molina','Testie','Test'),(11,'2022-05-29 02:10:23','2022-05-29 02:10:23','Franco','Molina','Testie','Test'),(12,'2022-05-29 02:10:52','2022-05-29 02:10:52','Franco','Molina','Testie','Test'),(13,'2022-05-29 02:12:03','2022-05-29 02:12:03','Franco','Molina','Testie','Test'),(14,'2022-05-29 02:12:05','2022-05-29 02:12:05','Franco','Molina','Testie','Test'),(15,'2022-05-29 02:12:29','2022-05-29 02:12:29','Franco','Molina','Testie','Test'),(16,'2022-05-29 02:15:54','2022-05-29 02:15:54','Franco','Molina','Testie','Test'),(17,'2022-05-29 02:15:56','2022-05-29 02:15:56','Franco','Molina','Testie','Test'),(18,'2022-05-29 02:16:29','2022-05-29 02:16:29','Franco','Molina','Testie','Test'),(19,'2022-05-29 02:19:47','2022-05-29 02:19:47','Franco','Molina','Testie','Test'),(20,'2022-05-29 02:22:03','2022-05-29 02:22:03','Franco','Molina','Testie','Test'),(21,'2022-05-29 02:22:05','2022-05-29 02:22:05','Franco','Molina','Testie','Test'),(22,'2022-05-29 02:22:13','2022-05-29 02:22:13','Franco','Molina','Testie','Test'),(23,'2022-05-29 02:23:58','2022-05-29 02:23:58','Franco','Molina','Tester','Testing'),(24,'2022-05-29 02:25:29','2022-05-29 02:25:29','James','Woof','James','Woof'),(25,'2022-05-29 02:25:34','2022-05-29 02:25:34','James','Woof','James','Woof'),(26,'2022-05-29 02:25:41','2022-05-29 02:25:41','James','Woof2','James','Woof2'),(27,'2022-05-29 02:41:09','2022-05-29 02:41:09','James','Woof3','James','Woof3'),(28,'2022-05-29 03:38:10','2022-05-29 03:38:10','JoeTest','Test1','JoeTest','password'),(29,'2022-05-29 03:39:53','2022-05-29 03:39:53','test2','test3','userjoe','password'),(30,'2022-05-29 03:40:23','2022-05-29 03:40:23','anothertest','test2','joejoe','password'),(31,'2022-05-29 04:47:11','2022-05-29 04:47:11','Dom','Rickson','dRick','password'),(32,'2022-05-29 04:50:37','2022-05-29 04:50:37','Keegan','Herald','keyh','password'),(33,'2022-05-29 04:59:59','2022-05-29 04:59:59','Another','Person','anotherJoe','password'),(34,'2022-05-29 14:24:38','2022-05-29 14:24:38','Joe','Test1','myuser','password'),(35,'2022-05-29 15:30:10','2022-05-29 15:30:10','Tester','Guy','guy','password');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-29 23:56:16
