-- MySQL dump 10.13  Distrib 8.0.12, for osx10.13 (x86_64)
--
-- Host: localhost    Database: studs
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `comment` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_key` int(11) NOT NULL,
  `user_key` int(11) NOT NULL,
  `text` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `timestamp` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `company_key` (`company_key`),
  KEY `user_key` (`user_key`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`company_key`) REFERENCES `company` (`company_id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_key`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,269,1,'Har mejlat dem och sagt att vi letar efter företag för event under hösten',1565683485000),(2,277,1,'Mejlade och frågade om möte',1565784844000),(3,277,1,'De svarade och verkar taggade! Möte inbokat den 4/9 klockan 14:00 :D',1565795644000),(4,320,1,'Mejlade och sa \"ni ville bli kontaktade efter sommaren\"',1565684044000),(5,320,1,'De ville ha mer info om Studs, typ vad det kostade osv. Jag skickade en lååång text som jag tog från 2019 års produktblad med diverse ändringar',1565777644000),(6,297,1,'Mejlade eftersom att de hade mejlat Nils och \"anmält intresse\". Sa att vi var taggade på att ha event i år.',1565684044000),(7,297,1,'De svarade om att de vill ha möte! Möte inbokat den 21/8',1565795644000),(8,284,1,'Mejlade standard \"ni var med förra året mejl\"',1565939644000),(9,282,1,'Mejlade standard \"ni var med förra året\"-mejl',1565940304000),(10,282,1,'De svarade med att de bara ska vara med på D-dagen i år :( \nDe är dock intresserade kommande år så Studs 2021 får testa då',1565943904000),(11,270,1,'Mejlade standard mejl',1565940304000),(12,399,1,'Mejlade standard mejl',1565940724000),(13,399,1,'De ville ha mer info om prisbilden, skickade lite info från \"produktkatalogen\"',1565942224000),(14,273,1,'Mejlade standard mejl',1565940404000),(21,269,1,'Mejlade igen och påminde',1566221781712),(22,269,1,'Michael svarade på mejlet och sa att de kan ta ett möte men att de helst vill ha event under våren',1566296232515),(26,320,1,'De undrade lite om vad studeterna läser och vill ha för jobb? Frågade igen om priset samt undrade om jag hade information på engelska',1566309408020),(27,297,1,'Haft möte! De är taggade och ska bara bestämma sig internt vilken vecka/dag de vill köra på. De ska återkomma senast 30/8. Jag ska fixa en offert',1566396830923),(28,270,1,'Mejlade igenom och påminde',1566809505194),(29,270,1,'Fick NU automatiskt svar att Camilla var på mammaledighet till oktober 2020. Mejlar en Lisa istället',1566809765841),(30,273,1,'Mejlade igen och påminnde',1566809980166),(31,284,1,'De är intresserade och undrade vad \"nästa steg\" är. Har bokat in säljmöte till 26/8',1566810071846),(32,270,1,'De svarade att de var intresserade men att hon (Lisa) nyss tagit över studentkontakt så hon behöver sätta sig in mer',1566810826754),(33,284,1,'Prelbokade till onsdag 22/1 (de vill till puben efter). De ska dubbelkolla internt innan det är spik',1566830841726),(34,282,1,'Jag kontaktade August Bergman som bad mig lägga till hans chef, Fredik, som kontaktperson istället',1566831209537),(35,272,1,'Mejlade standardmejl',1566904958642),(36,440,1,'Skrev privat till Björn och frågade om Studs är något för dem',1566905854837),(37,406,1,'Mejlade standardmejl',1566906412187),(38,290,1,'De mejlade mig och frågade om jag var rätt person att kontakta. Jag svarade ja och föreslog ett möte',1566996403479),(39,406,1,'De svarade att de ska sätta budget för dessa typer av event \"senare under hösten\" och att de återkommer då. Lär därför inte bli event HT19 under förmodligen VT20. Kanske plinga typ i november/december?',1566996897598),(40,297,1,'De har återkommit och jag har skickat avtal! Event bokat 2019-10-02 :D',1567001301728),(41,313,1,'Skickade standard \"ni blev kontaktade förra året men var inte med\"-mejl',1567002631963),(42,273,1,'Fortfarande inget svar så testade mejla Johan Arnör istället för Jonas Stendahl',1567002893480);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `company` (
  `company_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `status` int(11) DEFAULT NULL,
  `responsible_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`company_id`),
  KEY `responsible_user` (`responsible_user`),
  KEY `company_ibfk_2` (`status`),
  CONSTRAINT `company_ibfk_1` FOREIGN KEY (`responsible_user`) REFERENCES `user` (`user_id`),
  CONSTRAINT `company_ibfk_2` FOREIGN KEY (`status`) REFERENCES `status` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=441 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'Boliden Group',1,NULL),(2,'ApoEx',1,NULL),(3,'Avanade',1,NULL),(4,'Daresay AB',1,NULL),(5,'Datscha',1,NULL),(6,'Doktor24',1,NULL),(7,'Dustin',1,NULL),(8,'Dynabyte',1,NULL),(9,'Pe accounting',1,NULL),(10,'SBAB',1,NULL),(11,'Scania',1,NULL),(12,'Sopra Steria',1,NULL),(13,'Ubisoft',1,NULL),(14,'Adobe',1,NULL),(15,'Aducera',1,NULL),(16,'Atlas Copco',1,NULL),(17,'Avanza',1,NULL),(18,'BAE Systems Hagglunds and Bofors',1,NULL),(19,'BCG',1,NULL),(20,'Capgemini',1,NULL),(21,'Certezza AB',1,NULL),(22,'Deloitte',1,NULL),(23,'EF (Education First)',1,NULL),(24,'Ericsson',1,NULL),(25,'Fatshark',1,NULL),(26,'Fluido Sweden AB',1,NULL),(27,'FOI (Totalförsvarets forskningsinstitut)',1,NULL),(28,'Google',1,NULL),(29,'H&M',1,NULL),(30,'iZettle',1,NULL),(31,'Kaplan',1,NULL),(32,'Karma',1,NULL),(33,'Klarna',1,NULL),(34,'KPMG',1,NULL),(35,'LeoVegas',1,NULL),(36,'Net Insight AB',1,NULL),(37,'Paradox Interactive',1,NULL),(38,'Raysearch',1,NULL),(39,'Saab Group',1,NULL),(40,'Spotify',1,NULL),(41,'3 (tre)',1,NULL),(42,'ABB',1,NULL),(43,'Accedo',1,NULL),(44,'Accigo',1,NULL),(45,'Actagon',1,NULL),(46,'adsensus',1,NULL),(47,'Advania',1,NULL),(48,'Amazon',1,NULL),(49,'AMF',1,NULL),(50,'App Shack',1,NULL),(51,'Applicon',1,NULL),(52,'Arrow Electronics',1,NULL),(53,'Avalanche',1,NULL),(54,'Avega Group AB',1,NULL),(55,'Axfood',1,NULL),(56,'Basefarm',1,NULL),(57,'Biolit AB',1,NULL),(58,'Bloomberg',1,NULL),(59,'Bonnier Broadcasting',1,NULL),(60,'Bontouch',1,NULL),(61,'Booking.com',1,NULL),(62,'C3 Konsult AB',1,NULL),(63,'Cambio Healthcare Systems',1,NULL),(64,'Carmenta',1,NULL),(65,'Centric',1,NULL),(66,'Cerner',1,NULL),(67,'Chas Visual Management',1,NULL),(68,'Cinnober Financial Technology AB',1,NULL),(69,'Cognizant',1,NULL),(70,'Columbus Sverige & iStone',1,NULL),(71,'Combitech',1,NULL),(72,'COWI AB',1,NULL),(73,'Curamando',1,NULL),(74,'Dfind',1,NULL),(75,'Dialect AB',1,NULL),(76,'Edgeguide',1,NULL),(77,'Electrolux',1,NULL),(78,'Elekta',1,NULL),(79,'Enfo',1,NULL),(80,'ESA',1,NULL),(81,'ESSIQ',1,NULL),(82,'Evry',1,NULL),(83,'Excitera',1,NULL),(84,'Flow Traders',1,NULL),(85,'Flygresor.se',1,NULL),(86,'Forefront Consulting Group AB',1,NULL),(87,'Heads Svenska AB',1,NULL),(88,'Hedvig',1,NULL),(89,'Huawei Technologies',1,NULL),(90,'i3tex',1,NULL),(91,'ICA',1,NULL),(92,'ID North',1,NULL),(93,'Inspecta',1,NULL),(94,'IP-solutions',1,NULL),(95,'IP-Solutions AB',1,NULL),(96,'Kambi',1,NULL),(97,'Knightec',1,NULL),(98,'Kronofogden',1,NULL),(99,'Länsförsäkringar',1,NULL),(100,'Lemontree',1,NULL),(101,'Lendify',1,NULL),(102,'Lifesum',1,NULL),(103,'Magnea',1,NULL),(104,'Meltwater',1,NULL),(105,'Meridium',1,NULL),(106,'Multisoft',1,NULL),(107,'New Innovation Management',1,NULL),(108,'Octapharma',1,NULL),(109,'Omicron',1,NULL),(110,'Peltarion',1,NULL),(111,'Primekey Solutions AB',1,NULL),(112,'PRV (Patent- och registreringsverket)',1,NULL),(113,'Quinyx',1,NULL),(114,'Random Forest',1,NULL),(115,'Samsung',1,NULL),(116,'SAP',1,NULL),(117,'Sectra',1,NULL),(118,'Secure State',1,NULL),(119,'Skatteverket',1,NULL),(120,'Skysparc',1,NULL),(121,'Sqore',1,NULL),(122,'Svenska Spel',1,NULL),(123,'SVT',1,NULL),(125,'Systembolaget',1,NULL),(126,'Tacton Systems AB',1,NULL),(127,'Tele2',1,NULL),(128,'Telenor',1,NULL),(129,'Thompson Reuters',1,NULL),(130,'Tidal',1,NULL),(131,'Trinovo Consulting',1,NULL),(132,'Triona',1,NULL),(133,'Truecaller',1,NULL),(134,'Trustly',1,NULL),(135,'Vainu.io',1,NULL),(136,'Vattenfall',1,NULL),(137,'Vizrt',1,NULL),(138,'We Know IT',1,NULL),(139,'Wrapp',1,NULL),(140,'Xylem',1,NULL),(141,'Yelp',1,NULL),(142,'Airbnb',1,NULL),(143,'Apple',1,NULL),(144,'Blizzard Entertainment',1,NULL),(145,'Cambridge Analytica',1,NULL),(146,'Dolby Digital',1,NULL),(147,'Ernst & Young AB',1,NULL),(148,'Facebook',1,NULL),(149,'Handelsbanken',1,NULL),(150,'Intel',1,NULL),(151,'Master Card',1,NULL),(152,'Mojang',1,NULL),(153,'SCA (Svenska Cellulosa AB)',1,NULL),(154,'Star Stable Entertainment AB',1,NULL),(155,'Academic Communication (Telia)',1,NULL),(156,'Acando',1,NULL),(157,'Addnode',1,NULL),(158,'Airbus',1,NULL),(159,'Akamai',1,NULL),(160,'Anchr',1,NULL),(161,'Appspotr',1,NULL),(162,'Arbetsförmedlingen',1,NULL),(163,'Arduino',1,NULL),(164,'ARM',1,NULL),(165,'ATEA',1,NULL),(166,'AVL',1,NULL),(167,'Axis',1,NULL),(168,'Backelite',1,NULL),(169,'Bekk',1,NULL),(170,'Bingolabs AB',1,NULL),(171,'BitSec',1,NULL),(172,'BlackRock',1,NULL),(173,'Bloom',1,NULL),(174,'Bombardier Transportation',1,NULL),(175,'Cisco',1,NULL),(176,'CloudFlair',1,NULL),(177,'Coda Easy',1,NULL),(178,'Collabrik',1,NULL),(179,'Confetti',1,NULL),(180,'DeLaval International',1,NULL),(181,'Detectify',1,NULL),(182,'Digital Ocean',1,NULL),(183,'Digital Workforce',1,NULL),(184,'Diversi',1,NULL),(185,'Dropbox',1,NULL),(186,'EMC',1,NULL),(187,'Emric',1,NULL),(188,'Esa',1,NULL),(189,'Everteam',1,NULL),(190,'Exeger',1,NULL),(191,'EyeOnID',1,NULL),(192,'Faveo Projektledning',1,NULL),(193,'Fingerprints',1,NULL),(194,'Fishbrain',1,NULL),(195,'Flype',1,NULL),(196,'Framtiden',1,NULL),(197,'Gastrofy',1,NULL),(198,'Generic Systems Sweden',1,NULL),(199,'GeoBoard',1,NULL),(200,'GKN Driveline Köping',1,NULL),(201,'Global Technology Solution',1,NULL),(202,'Glue',1,NULL),(203,'GpsGate',1,NULL),(204,'Grant Thornton',1,NULL),(205,'Greenely',1,NULL),(206,'Handelshögskolan SSE Business Lab',1,NULL),(207,'HotSwap',1,NULL),(208,'IBM',1,NULL),(209,'IIS',1,NULL),(210,'Incoord',1,NULL),(211,'Industrial and Financial Systems (IFS)',1,NULL),(212,'Infotiv',1,NULL),(213,'Interfleet',1,NULL),(214,'Intertek',1,NULL),(215,'IP-only',1,NULL),(216,'IT-huset',1,NULL),(217,'KTH Innovation',1,NULL),(218,'Lantmännen',1,NULL),(219,'LUP Technologies',1,NULL),(220,'ManoMotion',1,NULL),(221,'Mawell',1,NULL),(222,'Midroc',1,NULL),(223,'Mycronic',1,NULL),(224,'newbox',1,NULL),(225,'Nexus Group',1,NULL),(226,'Nixu',1,NULL),(227,'Omegapoint',1,NULL),(228,'One agency',1,NULL),(229,'Pilloxa',1,NULL),(230,'Pivotal labs',1,NULL),(231,'Plaid',1,NULL),(232,'Prime Force',1,NULL),(233,'Referanza',1,NULL),(234,'SAS',1,NULL),(235,'Seamless Distribution Systems',1,NULL),(236,'SFDC Sweden AB',1,NULL),(237,'SL',1,NULL),(238,'Slagkryssaren',1,NULL),(239,'Sokigo AB',1,NULL),(240,'SOS alarm',1,NULL),(241,'Soundtrack your brand',1,NULL),(242,'Stockholm Blockchain',1,NULL),(243,'Stora Enso',1,NULL),(244,'Svenska kraftnät',1,NULL),(245,'Symbio sweden',1,NULL),(246,'Tarsier',1,NULL),(247,'Texas Instruments',1,NULL),(248,'Thermofisher',1,NULL),(249,'THS-konsulter',1,NULL),(250,'Tictail',1,NULL),(251,'Tinitell',1,NULL),(252,'Touchpoint',1,NULL),(253,'TUI',1,NULL),(254,'TV4',1,NULL),(255,'Uber',1,NULL),(256,'Ugglo',1,NULL),(257,'Unibet',1,NULL),(258,'Vale Games???',1,NULL),(259,'Valve',1,NULL),(260,'Videoplaza AB',1,NULL),(261,'Visionists',1,NULL),(262,'VM Ware',1,NULL),(263,'Volvo Group',1,NULL),(264,'Waitress',1,NULL),(265,'XLENT Consulting Group',1,NULL),(266,'Ooyala',1,NULL),(267,'Challengermode',1,NULL),(268,'Digpro',1,NULL),(269,'Kry',4,1),(270,'NEXTriOptima',3,1),(271,'R2M',1,NULL),(272,'SEB',2,1),(273,'Sellpy',2,1),(274,'Abios Gaming (startup)',1,NULL),(275,'Attentec',1,NULL),(276,'BDO',1,NULL),(277,'Cygni',4,1),(278,'Decerno',1,NULL),(279,'Digital Edge',1,NULL),(280,'Epidemic Sound',1,NULL),(281,'Milkywire',1,NULL),(282,'Scila',-1,1),(283,'Storytel',1,NULL),(284,'TeamEngine',6,1),(285,'Teleopti',1,NULL),(286,'Tink',1,NULL),(287,'Topgolf',1,NULL),(288,'Tritech Technology AB',1,NULL),(289,'Tutus Data',1,NULL),(290,'Visma',1,NULL),(291,'Autoliv',1,NULL),(292,'ComeOn',1,NULL),(293,'Huawei',1,NULL),(294,'Knowit',1,NULL),(295,'BetssonGroup',1,NULL),(296,'Budbee',1,NULL),(297,'Dewire',7,1),(298,'DICE/EA',1,NULL),(299,'FindWise',1,NULL),(300,'Folksam',1,NULL),(301,'Försvarsmakten',1,NULL),(302,'Försvarsmakten (IT-försvarsförbandet)',1,NULL),(303,'FRA',1,NULL),(304,'GE',1,NULL),(305,'IKEA',1,NULL),(306,'Investor',1,NULL),(307,'King',1,NULL),(308,'McKinsey & Company',1,NULL),(309,'Mentimeter',1,NULL),(310,'Modular Finance',1,NULL),(311,'Nasdaq',1,NULL),(312,'Natural Cycles',1,NULL),(313,'Netlight Consulting AB',2,1),(314,'Palantir',1,NULL),(315,'Polismyndigheten',1,NULL),(316,'Pricewaterhousecoopers (PwC)',1,NULL),(317,'Sigma',1,NULL),(318,'Snow Software AB',1,NULL),(319,'Sweco',1,NULL),(320,'Swedbank',3,1),(321,'Academic Work',1,NULL),(322,'Accenture',1,NULL),(323,'ÅF',2,2),(324,'Agero',1,NULL),(325,'Alten',1,NULL),(326,'Altran',1,NULL),(327,'Ampfield',1,NULL),(328,'Ants',1,NULL),(329,'Apotea',1,NULL),(330,'Arcam',1,NULL),(331,'Arctic Securities',1,NULL),(332,'Arrowhead',1,NULL),(333,'Ascend',1,NULL),(334,'Astra Zeneca',1,NULL),(335,'Athega AB',1,NULL),(336,'b3',1,NULL),(337,'Bannerflow',1,NULL),(338,'Berotec',1,NULL),(339,'Bisnode',1,NULL),(340,'Blocket',1,NULL),(341,'Bonnier',1,NULL),(342,'Booli',1,NULL),(343,'Brummer&Partners',1,NULL),(344,'CANEA Partner Group',1,NULL),(345,'Capacent',1,NULL),(346,'Centigo',1,NULL),(347,'Certezza',1,NULL),(348,'CGI',1,NULL),(349,'Cheffle',1,NULL),(350,'Claremont',1,NULL),(351,'Consid',1,NULL),(352,'CSC',1,NULL),(353,'Cybercom Sweden',1,NULL),(354,'Cygate',1,NULL),(355,'Danske Bank',1,NULL),(356,'Dektech',1,NULL),(357,'Dell',1,NULL),(358,'Dicom',1,NULL),(359,'Digital Route',1,NULL),(360,'Doctrin',1,NULL),(361,'East capital',1,NULL),(362,'Easypark',1,NULL),(363,'Eclipse Optics',1,NULL),(364,'Ellevio',1,NULL),(365,'EMG',1,NULL),(366,'Endeavor',1,NULL),(367,'Epicor',1,NULL),(368,'Exsitec',1,NULL),(369,'Findify',1,NULL),(370,'FindOut Technologies AB',1,NULL),(371,'FIS Global (FD SunGard)',1,NULL),(372,'Flarie',1,NULL),(373,'FLIR SYSTEMS',1,NULL),(374,'FoodFlow',1,NULL),(375,'Formpipe Software AB',1,NULL),(376,'Fujitsu Sweden',1,NULL),(377,'Futurice',1,NULL),(378,'Fyndiq',1,NULL),(379,'G-loot',1,NULL),(380,'Giesecke & Devrient',1,NULL),(381,'Go See Talents',1,NULL),(382,'Hewlett Packard Enterprise',1,NULL),(383,'HiQ',1,NULL),(384,'Hitta.se',1,NULL),(385,'Ida Infront Ab',1,NULL),(386,'IDG',1,NULL),(387,'IF',1,NULL),(388,'Implement Consulting Group',1,NULL),(389,'Infinera',1,NULL),(390,'Itello',1,NULL),(391,'Kundo',1,NULL),(392,'Kvadrat',1,NULL),(393,'LeanOn',1,NULL),(394,'Lime',1,NULL),(395,'Looklet AB',1,NULL),(396,'Lynx Asset Management',1,NULL),(397,'Megger',1,NULL),(398,'Metamatrix',1,NULL),(399,'Microsoft',3,1),(400,'Millicom Digital Ventures',1,NULL),(401,'Mpya',1,NULL),(402,'NetEnt',1,NULL),(403,'Norconsult Astando AB',1,NULL),(404,'Nordea',1,NULL),(405,'Nordic Entertainment Group',1,NULL),(406,'Nordnet',3,1),(407,'NOX consulting',1,NULL),(408,'NVBS Business IT AB',1,NULL),(409,'Oracle',1,NULL),(410,'Rumbline Consulting',1,NULL),(411,'Sentor',1,NULL),(412,'Sirona',1,NULL),(413,'Skandia',1,NULL),(414,'SKF',1,NULL),(415,'Söderberg & Partners',1,NULL),(416,'SOGETI',1,NULL),(417,'SSAB',1,NULL),(418,'Star republic',1,NULL),(419,'Starbreeze',1,NULL),(420,'Subset AB',1,NULL),(421,'Sveriges Ingenjörer',1,NULL),(422,'T2 data',1,NULL),(423,'Telia',1,NULL),(424,'The Techno Creatives',1,NULL),(425,'Thomson Reuters',1,NULL),(426,'Tieto',1,NULL),(427,'Tobii',1,NULL),(428,'Tradedoubler',1,NULL),(429,'Trafikverket',1,NULL),(430,'Tretton37',1,NULL),(431,'Unionen',1,NULL),(432,'Valcon',1,NULL),(433,'Valtech',1,NULL),(434,'Volumental',1,NULL),(435,'Volvo',1,NULL),(436,'Webstep',1,NULL),(437,'Yabs',1,NULL),(438,'Yanzi Networks',1,NULL),(439,'Qapital',1,NULL),(440,'Resolution Games',3,1);
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `contact` (
  `contact_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_key` int(11) NOT NULL,
  `name` varchar(256) DEFAULT NULL,
  `phone_number` varchar(256) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `comment` text,
  PRIMARY KEY (`contact_id`),
  KEY `company_key` (`company_key`),
  CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`company_key`) REFERENCES `company` (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (3,277,'Per Rasmussen','070-947 21 50','per.rasmussen@cygni.se','VD på Cygni och väldigt bra koll på vad Studs är. Trevlig snubbe'),(5,269,'Michael Hjortholt','073 951 50 77','michael@kry.se','Gammal ÖD och har bra koll på Studs'),(10,320,'','','employerbranding@swedbank.se','Den som svarar nu heter Pardis Elahi'),(11,297,'Johanna Edström','070 608 52 26','johanna.edstrom@knightec.se','Har rollen som Team manager'),(12,270,'Camilla Herlog','','camilla.herlog@trioptima.com','Verkar vara mammaledig till oktober 2020'),(13,270,'Lisa Brandén','',' lisa.branden@trioptima.com',''),(14,273,'Jonas Stendahl','','jonas@sellpy.se','co-CTO på Sellpy'),(15,284,'Josefin Stølsvik Hagberg','0728 56 20 81','josefin.hagberg@teamengine.se',''),(16,282,'Fredrik Lydén','','fredrik.lyden@scila.se',''),(17,440,'Björn Englesson','','bjorn@resolutiongames.com','Storebror 2015'),(18,272,'Linda Elvelin Österman','070 772 30 24','linda.elvelin.osterman@seb.se',''),(19,406,'Lisa Calá','','lisa.cala@nordnet.se',''),(20,290,'Tora Matsson','076 135 17 96','tora.matsson@visma.com','Employer Branding and Recruitment Specialist'),(21,313,'Lars Ludvigsen','0708321480','lars.ludvigsen@netlight.com',''),(22,273,'Johan Arnör','','johan@sellpy.se','');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `status` (
  `status_id` int(11) NOT NULL,
  `status` varchar(256) NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (-1,'NEJ'),(1,'EJ KONTAKTAT'),(2,'KONTAKTAT'),(3,'HAR SVARAT'),(4,'SKA HA MÖTE'),(5,'HAFT MÖTE'),(6,'PREL BOKAT'),(7,'AVTAL SKICKAT'),(8,'ALLT KLART');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Cristian Osorio Bretti'),(2,'Pelle Svensson');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-29 11:39:50
