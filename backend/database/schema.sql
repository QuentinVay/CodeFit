

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
  `genre` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `is_admin` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Doe','John','test@example.com','$argon2id$v=19$m=65536,t=3,p=4$kwTr9LQMPlQJfLq5wd1vrw$jfFj6hqtZZ0DIP3kUqug+vkh+lFSIPOI60CO8L+WN6c','homme','0707070707',1),(2,'Smith','Alice','alice.smith@example.com','hashed_password2','femme','0606060606',0),(3,'Johnson','Bob','bob.johnson@example.com','hashed_password3','homme','0808080808',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `codefit`.`gym`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `codefit`.`gym` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `gym_name` VARCHAR(45) NOT NULL,
  `consolidated_longitude` DOUBLE NOT NULL,
  `consolidated_latitude` DOUBLE NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

LOCK TABLES `gym` WRITE;
/*!40000 ALTER TABLE `gym` DISABLE KEYS */;
INSERT INTO `gym` VALUES 
(1, 'DynamoGym', '3.407609123225763', '43.41959147913006', 'Bienvenue chez DynamoGym, l''endroit où l''énergie prend vie! Notre salle de sport dynamique offre un environnement électrisant, propice à des entraînements intensifs. Avec des équipements de pointe, des programmes personnalisés et une équipe d''instructeurs passionnés, DynamoGym est le lieu idéal pour booster votre forme physique. Laissez-vous emporter par la puissance de l''énergie en mouvement et transformez votre routine d''entraînement chez DynamoGym'),
(2, 'FusionFit', '2.987654321', '48.765432109', 'Chez FusionFit, la fusion de la forme physique et du bien-être est au cœur de tout ce que nous faisons. Nos espaces modernes et inspirants vous invitent à explorer une variété d''activités, de la musculation aux cours de yoga relaxants. Avec des programmes qui intègrent l''équilibre, la force et la flexibilité, FusionFit offre une approche holistique pour atteindre vos objectifs de fitness. Découvrez une fusion harmonieuse entre le corps et l''esprit chez FusionFit'),
(3, 'NovaFit', '4.567890123', '35.678901234', 'NovaFit, le nouveau standard de fitness, vous emmène vers de nouveaux sommets. Notre salle de sport ultramoderne combine l''innovation, le confort et la motivation pour créer une expérience d''entraînement exceptionnelle. Que vous soyez un débutant enthousiaste ou un athlète chevronné, NovaFit propose des équipements de pointe, des cours novateurs et une atmosphère stimulante. Découvrez la nouvelle frontière du fitness chez NovaFit, où chaque séance d''entraînement est une aventure vers le bien-être optimal');
/*!40000 ALTER TABLE `gym` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `codefit`.`coatch`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `codefit`.`coatch` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `product_price` INT(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `codefit`.`user_gym`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `codefit`.`user_gym` (
  `user_id` INT NOT NULL,
  `gym_id` INT NOT NULL,
  `reservation_date` DATE NOT NULL,
  CONSTRAINT `fk_user_has_gym_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `codefit`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_has_gym_gym1`
    FOREIGN KEY (`gym_id`)
    REFERENCES `codefit`.`gym` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

