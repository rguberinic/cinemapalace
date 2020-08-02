-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: ponovo_radi_bioskop
-- ------------------------------------------------------
-- Server version	5.7.30-log

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
-- Table structure for table `prodata_sedista`
--

DROP TABLE IF EXISTS `prodata_sedista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prodata_sedista` (
  `prs_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `kor_id` int(10) unsigned NOT NULL,
  `sed_id` int(2) unsigned NOT NULL,
  `film_id` int(10) unsigned NOT NULL,
  `prs_datum` datetime NOT NULL,
  PRIMARY KEY (`prs_id`),
  KEY `fk_prosed_korisnici_idx` (`kor_id`),
  KEY `fk_prosed_filmovi_idx` (`film_id`),
  CONSTRAINT `fk_prosed_filmovi` FOREIGN KEY (`film_id`) REFERENCES `filmovi` (`film_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_prosed_korisnici` FOREIGN KEY (`kor_id`) REFERENCES `korisnici` (`kor_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=518 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prodata_sedista`
--

LOCK TABLES `prodata_sedista` WRITE;
/*!40000 ALTER TABLE `prodata_sedista` DISABLE KEYS */;
INSERT INTO `prodata_sedista` VALUES (512,1,2,49,'2020-06-04 12:51:46'),(513,1,3,49,'2020-06-04 12:51:46'),(514,1,4,49,'2020-06-04 12:52:50'),(515,1,5,49,'2020-06-04 12:52:51'),(516,1,6,49,'2020-06-04 12:52:51'),(517,1,7,49,'2020-06-04 12:52:51');
/*!40000 ALTER TABLE `prodata_sedista` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-21 16:22:11
