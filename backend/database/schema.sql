

-- -----------------------------------------------------
-- Schema codefit
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `codefit` DEFAULT CHARACTER SET utf8 ;
USE `codefit` ;

-- -----------------------------------------------------
-- Table `codefit`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `codefit`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `hashed_password` VARCHAR(255) NOT NULL,
  `genre` VARCHAR(45) NULL,
  `phone` VARCHAR(20) NULL,
  `is_admin` TINYINT(1) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Doe','John','john@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$IKqbC9JMn5pnv0SNSkwgiQ$Ws5v52SxeLZWc7Ph18g2VVC77llhPAMeuimmkSGRtW8','homme','0606060606',1),(2,'Smith','Alice','alice.smith@example.com','hashed_password2','femme','0606060606',0),(3,'Johnson','Bob','bob.johnson@example.com','hashed_password3','homme','0808080808',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `codefit`.`gym`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `codefit`.`gym` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `gym_name` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `consolidated_longitude` DOUBLE NOT NULL,
  `consolidated_latitude` DOUBLE NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

LOCK TABLES `gym` WRITE;
/*!40000 ALTER TABLE `gym` DISABLE KEYS */;
INSERT INTO `gym` VALUES 
(1, 'DynamoGym','Toulouse', '3.407609123225763', '43.41959147913006', 'Bienvenue chez DynamoGym, l''endroit où l''énergie prend vie! Notre salle de sport dynamique offre un environnement électrisant, propice à des entraînements intensifs. Avec des équipements de pointe, des programmes personnalisés et une équipe d''instructeurs passionnés, DynamoGym est le lieu idéal pour booster votre forme physique. Laissez-vous emporter par la puissance de l''énergie en mouvement et transformez votre routine d''entraînement chez DynamoGym'),
(2, 'FusionFit','Toulouse', '2.987654321', '48.765432109', 'Chez FusionFit, la fusion de la forme physique et du bien-être est au cœur de tout ce que nous faisons. Nos espaces modernes et inspirants vous invitent à explorer une variété d''activités, de la musculation aux cours de yoga relaxants. Avec des programmes qui intègrent l''équilibre, la force et la flexibilité, FusionFit offre une approche holistique pour atteindre vos objectifs de fitness. Découvrez une fusion harmonieuse entre le corps et l''esprit chez FusionFit'),
(3, 'NovaFit','Toulouse', '4.567890123', '35.678901234', 'NovaFit, le nouveau standard de fitness, vous emmène vers de nouveaux sommets. Notre salle de sport ultramoderne combine l''innovation, le confort et la motivation pour créer une expérience d''entraînement exceptionnelle. Que vous soyez un débutant enthousiaste ou un athlète chevronné, NovaFit propose des équipements de pointe, des cours novateurs et une atmosphère stimulante. Découvrez la nouvelle frontière du fitness chez NovaFit, où chaque séance d''entraînement est une aventure vers le bien-être optimal'),
(4, 'EclatFitness','Toulouse', '1.234567890', '43.210987654', 'Bienvenue à EclatFitness, l''endroit où la passion pour la forme physique brille de mille feux. Notre salle de sport offre une ambiance énergique et des équipements de pointe pour vous aider à atteindre vos objectifs. Avec des cours dynamiques et des entraînements personnalisés, EclatFitness est l''endroit idéal pour illuminer votre parcours fitness. Rejoignez-nous et laissez votre éclat intérieur briller!'),
(5, 'VitalityHub','Toulouse', '3.456789012', '43.210987654', 'VitalityHub est plus qu''une salle de sport, c''est un hub de vitalité! Avec des installations modernes et des programmes variés, nous vous inspirons à atteindre votre meilleur moi. Nos coachs dédiés vous guideront à travers des séances stimulantes pour améliorer votre force, votre endurance et votre bien-être général. Vivez une vie pleine de vitalité avec VitalityHub!'),
(6, 'ZenithFit','Toulouse', '1.234567890', '42.345678901', 'Chez ZenithFit, l''équilibre entre le corps et l''esprit est au cœur de tout ce que nous faisons. Notre salle de sport paisible offre des espaces dédiés à la méditation, en plus d''équipements de pointe pour des séances d''entraînement efficaces. Découvrez des cours de fitness uniques et relaxants qui vous aident à atteindre l''harmonie intérieure. Rejoignez-nous à ZenithFit pour une expérience de bien-être complète.');
/*!40000 ALTER TABLE `gym` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `codefit`.`coach`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `codefit`.`coach` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `product_price` INT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

LOCK TABLES `coach` WRITE;
/*!40000 ALTER TABLE `coach` DISABLE KEYS */;
INSERT INTO `coach` (`id`, `firstname`, `lastname`, `product_price`) VALUES 
(1, 'Quentin', 'Vayssieres', 50),
(2, 'Marcelo', 'Romero', 200),
(3, 'Khachik', 'Sahakyan', 50);
/*!40000 ALTER TABLE `coach` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `codefit`.`user_gym`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `codefit`.`user_gym` (
  `user_id` INT NOT NULL,
  `gym_id` INT NOT NULL,
  `reservation_date` DATE NOT NULL,
  `reservation_heure` TIME NOT NULL,
  CONSTRAINT `fk_user_has_gym_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `codefit`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_has_gym_gym1`
    FOREIGN KEY (`gym_id`)
    REFERENCES `codefit`.`gym` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;
