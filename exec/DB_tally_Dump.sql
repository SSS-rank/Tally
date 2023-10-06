-- MariaDB dump 10.19-11.1.2-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: 
-- ------------------------------------------------------
-- Server version	11.1.2-MariaDB-1:11.1.2+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `tally`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `tally` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `tally`;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `account_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_number` varchar(255) NOT NULL,
  `account_password` varchar(255) NOT NULL,
  `bank_code` varchar(255) NOT NULL,
  `create_date` datetime(6) DEFAULT NULL,
  `order_number` int(11) NOT NULL,
  `representative_account` bit(1) NOT NULL,
  `status` bit(1) NOT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `UK_66gkcp94endmotfwb8r4ocxm9` (`account_number`),
  KEY `FKr5j0huynd7nsv1s7e9vb8qvwo` (`member_id`),
  CONSTRAINT `FKr5j0huynd7nsv1s7e9vb8qvwo` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bank`
--

DROP TABLE IF EXISTS `bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bank` (
  `bank_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `bank_code` varchar(255) NOT NULL,
  `bank_name` varchar(255) NOT NULL,
  PRIMARY KEY (`bank_id`),
  UNIQUE KEY `UK_r03df0r93i07xw7u6cm066ub7` (`bank_code`),
  UNIQUE KEY `UK_k7b1fp39xemdvdtco9j7uk62y` (`bank_name`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank`
--

LOCK TABLES `bank` WRITE;
/*!40000 ALTER TABLE `bank` DISABLE KEYS */;
INSERT INTO `bank` VALUES
(1,'039','경남은행'),
(2,'034','광주은행'),
(3,'012','단위농협'),
(4,'032','부산은행'),
(5,'045','새마을금고'),
(6,'088','신한은행'),
(7,'027','씨티은행'),
(8,'020','우리은행'),
(9,'037','전북은행'),
(10,'035','제주은행'),
(11,'090','카카오뱅크'),
(12,'089','케이뱅크'),
(13,'092','토스뱅크'),
(14,'081','하나은행'),
(15,'003','기업은행'),
(16,'004','국민은행'),
(17,'031','대구은행'),
(18,'002','산업은행'),
(19,'011','농협은행'),
(20,'023','SC제일은행'),
(21,'007','수협은행');
/*!40000 ALTER TABLE `bank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calculate_group`
--

DROP TABLE IF EXISTS `calculate_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `calculate_group` (
  `calculate_group_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `calculate_group_uuid` varchar(255) NOT NULL,
  `create_date` datetime(6) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`calculate_group_id`),
  KEY `FKkcvuc40m4nm9rntyebfw4pk8u` (`member_id`),
  CONSTRAINT `FKkcvuc40m4nm9rntyebfw4pk8u` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calculate_group`
--

LOCK TABLES `calculate_group` WRITE;
/*!40000 ALTER TABLE `calculate_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `calculate_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `category_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category_type` varchar(255) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES
(1,'숙소'),
(2,'항공'),
(3,'교통'),
(4,'관광'),
(5,'식사'),
(6,'쇼핑'),
(7,'기타');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `city` (
  `city_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `city_name` varchar(255) NOT NULL,
  `english_name` varchar(255) DEFAULT NULL,
  `state_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`city_id`),
  KEY `FK6p2u50v8fg2y0js6djc6xanit` (`state_id`),
  CONSTRAINT `FK6p2u50v8fg2y0js6djc6xanit` FOREIGN KEY (`state_id`) REFERENCES `state` (`state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES
(1,'수원시','Suwon',8),
(2,'성남시','Seongnam',8),
(3,'의정부시','Uijeongbu',8),
(4,'청주시','Chungju',9),
(5,'충주시','Cheongju',9),
(6,'제천시','Jecheon',9),
(7,'천안시','Cheonan',10),
(8,'공주시','Gongju',10),
(10,'전주시','Jeonju',11),
(11,'군산시','Gunsan',11),
(12,'익산시','Iksan',11),
(13,'목포시','Mokpo',12),
(14,'여수시','Yeosu',12),
(16,'포항시','Pohang',13),
(17,'경주시','Gyeongju',13),
(18,'김천시','Gimcheon',13),
(19,'창원시','Changwon',14),
(20,'진주시','Jinju',14),
(21,'통영시','Tongyeong',14),
(22,'춘천시','Chuncheon',16),
(23,'원주시','Wonju',16),
(24,'강릉시','Gangneung',16);
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `country_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `capital` varchar(255) DEFAULT NULL,
  `country_code` varchar(255) NOT NULL,
  `country_name` varchar(255) NOT NULL,
  `language` varchar(255) DEFAULT NULL,
  `time_difference` float NOT NULL,
  `visa` varchar(255) NOT NULL,
  PRIMARY KEY (`country_id`)
) ENGINE=InnoDB AUTO_INCREMENT=179 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES
(7,'athens','GR','그리스',NULL,-5,'90일'),
(12,'amsterdam','NL','네덜란드','id',-7,'90일'),
(15,'wellington','NZ','뉴질랜드','en',3,'90일'),
(18,'taipei','TW','대만','zh-TW',-1,'90일'),
(19,'copenhagen','DK','덴마크',NULL,-7,'180일 중 90일'),
(22,'berlin','DE','독일','de',-7,'90일'),
(27,'moscow','RU','러시아','ru',-6,'90일'),
(39,'macau','MO','마카오','zh-TW',-1,'90일'),
(40,'kuala lumpur','MY','말레이시아','id',-1,'90일'),
(42,'mexico city','MX','멕시코','es',-15,'90일'),
(50,'male','MV','몰디브',NULL,-4,'X'),
(54,'newyork','US','미국','en',-14,'X'),
(62,'hanoi','VN','베트남','vi',-2,'90일'),
(63,'brussels','BE','벨기에','fr',-7,'90일'),
(88,'stockholm','SE','스웨덴',NULL,-7,'90일'),
(89,'bern','CH','스위스','de',-7,'90일'),
(90,'madrid','ES','스페인','es',-7,'90일'),
(94,'singapore','SG','싱가포르','zh-CN',-1,'90일'),
(113,'london','GB','영국','en',-8,'6개월'),
(116,'wien','AT','오스트리아','de',-7,'180일'),
(127,'roma','IT','이탈리아','it',-7,'90일'),
(130,'tokyo','JP','일본','ja',0,'○'),
(135,'beijing','CN','중국','zh-CN',-1,'30일'),
(145,'ottawa','CA','캐나다','en',-14,'6개월'),
(159,'bangkok','TH','태국','th',-2,'90일'),
(172,'warszawa','PL','폴란드',NULL,-8,'90일'),
(173,'paris','FR','프랑스','fr',-8,'90일'),
(176,'manila','PH','필리핀',NULL,-1,'무기한'),
(177,'budapest','HU','헝가리',NULL,-8,'90일'),
(178,'hongkong','HK','홍콩','zh-TW',-1,'90일');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `custom_checklist`
--

DROP TABLE IF EXISTS `custom_checklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `custom_checklist` (
  `custom_checklist_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `create_date` datetime(6) DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  `travel_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`custom_checklist_id`),
  KEY `FKk5xt2ihxyy522erl2c78gwtrt` (`member_id`),
  KEY `FKk1p3k6395jfaxqmgo1xuw7qe0` (`travel_id`),
  CONSTRAINT `FKk1p3k6395jfaxqmgo1xuw7qe0` FOREIGN KEY (`travel_id`) REFERENCES `travel` (`travel_id`),
  CONSTRAINT `FKk5xt2ihxyy522erl2c78gwtrt` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custom_checklist`
--

LOCK TABLES `custom_checklist` WRITE;
/*!40000 ALTER TABLE `custom_checklist` DISABLE KEYS */;
/*!40000 ALTER TABLE `custom_checklist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `default_check_list`
--

DROP TABLE IF EXISTS `default_check_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `default_check_list` (
  `default_checklist_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `create_date` datetime(6) DEFAULT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`default_checklist_id`),
  KEY `FKogp9qt214m28sq36n3jkrgffh` (`member_id`),
  CONSTRAINT `FKogp9qt214m28sq36n3jkrgffh` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `default_check_list`
--

LOCK TABLES `default_check_list` WRITE;
/*!40000 ALTER TABLE `default_check_list` DISABLE KEYS */;
INSERT INTO `default_check_list` VALUES
(1,'여권','2023-10-06 09:05:07.406472',1),
(2,'충전기','2023-10-06 09:05:07.410693',1),
(3,'세면도구','2023-10-06 09:05:07.411759',1),
(4,'비상약','2023-10-06 09:05:07.414588',1),
(5,'지갑','2023-10-06 09:05:07.415520',1),
(6,'신분증','2023-10-06 09:05:07.416339',1),
(7,'여벌 옷','2023-10-06 09:05:07.417187',1),
(8,'여권','2023-10-06 09:07:11.811415',2),
(9,'충전기','2023-10-06 09:07:11.812298',2),
(10,'세면도구','2023-10-06 09:07:11.813101',2),
(11,'비상약','2023-10-06 09:07:11.815944',2),
(12,'지갑','2023-10-06 09:07:11.816817',2),
(13,'신분증','2023-10-06 09:07:11.817659',2),
(14,'여벌 옷','2023-10-06 09:07:11.818443',2);
/*!40000 ALTER TABLE `default_check_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device`
--

DROP TABLE IF EXISTS `device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `device` (
  `device_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_date` datetime(6) DEFAULT NULL,
  `device_status` bit(1) NOT NULL,
  `device_token` varchar(255) NOT NULL,
  `is_login` bit(1) NOT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`device_id`),
  KEY `FKs2ah6o1y9r1ox99fh8vj5y0ol` (`member_id`),
  CONSTRAINT `FKs2ah6o1y9r1ox99fh8vj5y0ol` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device`
--

LOCK TABLES `device` WRITE;
/*!40000 ALTER TABLE `device` DISABLE KEYS */;
INSERT INTO `device` VALUES
(1,'2023-10-06 09:05:07.391201','','cq6dA3wPTCaYvFNs2p2Ldt:APA91bG5t-iIQ_Rsp9WHSPR2w65hUnMh-Cg0E34pfF-7QDOk57lodC5e1Jq2FmJ98EfcOVirnswK1wLkBv1zzq9a0JOfD54y160T8fVDh_GHZZGdjgYLysjNr8SLbBt4ay_RaSpY-uy4','',1),
(2,'2023-10-06 09:07:11.809070','','ekVbl-qCR2yEj7BVPyDdmj:APA91bHWvliOfsZuSf2kNO0fgBDUHx54U7ubTxGDl0qYELnz7A7vTAeutX_lclbUFNVa5oRdN7jjvtUrD46y-k57jQp_WMZFtyhDOuTiA762raC1aOMrqRjcypmUYao3Onx_uukANXNQ','',2);
/*!40000 ALTER TABLE `device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_member`
--

DROP TABLE IF EXISTS `group_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group_member` (
  `group_member_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_number` varchar(255) DEFAULT NULL,
  `status` bit(1) NOT NULL,
  `calculate_group_id` bigint(20) DEFAULT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`group_member_id`),
  KEY `FKlyfb2k3wydobuf7f4jqca57hv` (`calculate_group_id`),
  KEY `FKeamf7nngsg582uxwqgde8o28x` (`member_id`),
  CONSTRAINT `FKeamf7nngsg582uxwqgde8o28x` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKlyfb2k3wydobuf7f4jqca57hv` FOREIGN KEY (`calculate_group_id`) REFERENCES `calculate_group` (`calculate_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_member`
--

LOCK TABLES `group_member` WRITE;
/*!40000 ALTER TABLE `group_member` DISABLE KEYS */;
/*!40000 ALTER TABLE `group_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_payment`
--

DROP TABLE IF EXISTS `group_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group_payment` (
  `group_payment_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `calculate_group_id` bigint(20) DEFAULT NULL,
  `payment_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`group_payment_id`),
  KEY `FK1x3ckqka25dfsa57jkobpynit` (`calculate_group_id`),
  KEY `FKnn1gtukxiiclfibb2eu8cti9b` (`payment_id`),
  CONSTRAINT `FK1x3ckqka25dfsa57jkobpynit` FOREIGN KEY (`calculate_group_id`) REFERENCES `calculate_group` (`calculate_group_id`),
  CONSTRAINT `FKnn1gtukxiiclfibb2eu8cti9b` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_payment`
--

LOCK TABLES `group_payment` WRITE;
/*!40000 ALTER TABLE `group_payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `group_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `member_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_date` datetime(6) DEFAULT NULL,
  `kakao_id` bigint(20) NOT NULL,
  `member_uuid` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `profile_image` varchar(255) NOT NULL,
  `transfer_password` varchar(255) DEFAULT NULL,
  `transfer_salt` varchar(255) DEFAULT NULL,
  `withdrawal_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `UK_tqi1nx9ul3nx7guxpqycuvgue` (`kakao_id`),
  UNIQUE KEY `UK_tf30a0bikx3impl0p9s66bnu4` (`member_uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES
(1,'2023-10-06 09:05:06.608640',3049044436,'f62e908b-8d01-4cee-8602-51f137155e67','박현철','http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg',NULL,NULL,NULL),
(2,'2023-10-06 09:07:11.803112',3019343713,'dce2b239-6f8b-465d-a236-d754323b797a','김선희','http://k.kakaocdn.net/dn/bwGxKX/btslghf7xOx/6aLVL9XjveBUTEpm3Fbu60/img_640x640.jpg',NULL,NULL,NULL);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_payment`
--

DROP TABLE IF EXISTS `member_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member_payment` (
  `member_payment_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `amount` bigint(20) NOT NULL,
  `create_date` datetime(6) DEFAULT NULL,
  `payment_date` datetime(6) NOT NULL,
  `status` bit(1) NOT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  `payment_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`member_payment_id`),
  KEY `FK8bl51kch86jxigs3eejxsgr0h` (`member_id`),
  KEY `FK4lx8k5tvs2xl0ne1uegw7e50i` (`payment_id`),
  CONSTRAINT `FK4lx8k5tvs2xl0ne1uegw7e50i` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`),
  CONSTRAINT `FK8bl51kch86jxigs3eejxsgr0h` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_payment`
--

LOCK TABLES `member_payment` WRITE;
/*!40000 ALTER TABLE `member_payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `member_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment` (
  `payment_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `amount` bigint(20) NOT NULL,
  `calculate_status` varchar(255) NOT NULL,
  `payment_korea_date` datetime(6) NOT NULL,
  `payment_local_date` datetime(6) NOT NULL,
  `payment_memo` varchar(255) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `payment_name` varchar(255) NOT NULL,
  `payment_uuid` varchar(255) NOT NULL,
  `ratio` double NOT NULL,
  `status` bit(1) NOT NULL,
  `transfer_uuid` varchar(255) DEFAULT NULL,
  `visible` bit(1) NOT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  `payment_unit_id` bigint(20) DEFAULT NULL,
  `travel_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `FKa1ene89e5u89jwr887ge1b4a9` (`category_id`),
  KEY `FK4pswry4r5sx6j57cdeulh1hx8` (`member_id`),
  KEY `FKbkf44sfxthf4i9vohmfl95sau` (`payment_unit_id`),
  KEY `FKjk49q274mts8dqaqfwsm7jxgg` (`travel_id`),
  CONSTRAINT `FK4pswry4r5sx6j57cdeulh1hx8` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKa1ene89e5u89jwr887ge1b4a9` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  CONSTRAINT `FKbkf44sfxthf4i9vohmfl95sau` FOREIGN KEY (`payment_unit_id`) REFERENCES `payment_unit` (`payment_unit_id`),
  CONSTRAINT `FKjk49q274mts8dqaqfwsm7jxgg` FOREIGN KEY (`travel_id`) REFERENCES `travel` (`travel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_unit`
--

DROP TABLE IF EXISTS `payment_unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment_unit` (
  `payment_unit_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `country_name` varchar(255) NOT NULL,
  `unit` varchar(255) NOT NULL,
  PRIMARY KEY (`payment_unit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_unit`
--

LOCK TABLES `payment_unit` WRITE;
/*!40000 ALTER TABLE `payment_unit` DISABLE KEYS */;
INSERT INTO `payment_unit` VALUES
(1,'미국','USD(미국 달러)'),
(2,'중국','CNY(위안)'),
(3,'일본','JPY(엔)'),
(4,'유럽','EUR(유로)'),
(5,'스위스','CHF(프랑)'),
(6,'영국','GBP(파운드스털링)'),
(7,'베트남','VND(둥)'),
(8,'대한민국','KRW(원)');
/*!40000 ALTER TABLE `payment_unit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stamp`
--

DROP TABLE IF EXISTS `stamp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stamp` (
  `stamp_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_date` datetime(6) DEFAULT NULL,
  `travel_location` bigint(20) NOT NULL,
  `travel_type` varchar(255) NOT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`stamp_id`),
  KEY `FK1oscorlxc4ywlhvbucl1j2q9q` (`member_id`),
  CONSTRAINT `FK1oscorlxc4ywlhvbucl1j2q9q` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stamp`
--

LOCK TABLES `stamp` WRITE;
/*!40000 ALTER TABLE `stamp` DISABLE KEYS */;
/*!40000 ALTER TABLE `stamp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `state` (
  `state_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `english_name` varchar(255) DEFAULT NULL,
  `state_name` varchar(255) NOT NULL,
  PRIMARY KEY (`state_id`),
  UNIQUE KEY `UK_qtjsbpmp2ejq0753ktldenyqo` (`state_name`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES
(1,'Seoul','서울특별시'),
(2,'Busan','부산광역시'),
(3,'Daegu','대구광역시'),
(4,'Incheon','인천광역시'),
(5,'Gwangju','광주광역시'),
(6,'Daejeon','대전광역시'),
(7,'Ulsan','울산광역시'),
(8,NULL,'경기도'),
(9,NULL,'충청북도'),
(10,NULL,'충청남도'),
(11,NULL,'전라북도'),
(12,NULL,'전라남도'),
(13,NULL,'경상북도'),
(14,NULL,'경상남도'),
(15,'Jeju','제주특별자치도'),
(16,NULL,'강원특별자치도');
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `travel`
--

DROP TABLE IF EXISTS `travel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `travel` (
  `travel_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_date` datetime(6) NOT NULL,
  `end_date` date NOT NULL,
  `start_date` date NOT NULL,
  `status` bit(1) NOT NULL,
  `travel_location` bigint(20) NOT NULL,
  `travel_title` varchar(255) NOT NULL,
  `travel_type` varchar(255) NOT NULL,
  PRIMARY KEY (`travel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `travel`
--

LOCK TABLES `travel` WRITE;
/*!40000 ALTER TABLE `travel` DISABLE KEYS */;
/*!40000 ALTER TABLE `travel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `travel_group`
--

DROP TABLE IF EXISTS `travel_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `travel_group` (
  `travel_group_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `visible` bit(1) NOT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  `travel_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`travel_group_id`),
  KEY `FKl2wqo0t9pdd8qquoce5aswmrg` (`member_id`),
  KEY `FKbyh68jub0iwwlamgmcit5302x` (`travel_id`),
  CONSTRAINT `FKbyh68jub0iwwlamgmcit5302x` FOREIGN KEY (`travel_id`) REFERENCES `travel` (`travel_id`),
  CONSTRAINT `FKl2wqo0t9pdd8qquoce5aswmrg` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `travel_group`
--

LOCK TABLES `travel_group` WRITE;
/*!40000 ALTER TABLE `travel_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `travel_group` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-06  9:07:13
