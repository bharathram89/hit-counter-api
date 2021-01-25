
-- Remove all relationships
ALTER TABLE `hitCounter_dev`.`gameTypes` 
DROP FOREIGN KEY `custom_gameType_user`;
ALTER TABLE `hitCounter_dev`.`gameTypes` 
DROP INDEX `custom_gameType_user_idx` ;
;
-- 
ALTER TABLE `hitCounter_dev`.`playersGames` 
DROP FOREIGN KEY `custom_Users_userID`,
DROP FOREIGN KEY `custom_Games_gameID`;
ALTER TABLE `hitCounter_dev`.`playersGames` 
DROP INDEX `custom_Games_gameID_idx` ,
DROP INDEX `custom_Users_userID_idx` ;
;
--
ALTER TABLE `hitCounter_dev`.`games` 
DROP FOREIGN KEY `custom_games_userID_user`,
DROP FOREIGN KEY `custom_games_gameTypeID_gameType`;
ALTER TABLE `hitCounter_dev`.`games` 
DROP INDEX `custom_gameTypeID_gameType_idx` ,
DROP INDEX `custom_userID_user_idx` ;
;










-- readd all relationships 
ALTER TABLE `hitCounter_dev`.`gameTypes` 
ADD INDEX `custom_gameType_user_idx` (`userID` ASC) VISIBLE;
;
ALTER TABLE `hitCounter_dev`.`gameTypes` 
ADD CONSTRAINT `custom_gameType_user`
  FOREIGN KEY (`userID`)
  REFERENCES `hitCounter_dev`.`users` (`userID`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


-- 
ALTER TABLE `hitCounter_dev`.`playersGames` 
ADD INDEX `custom_Users_userID_idx` (`userID` ASC) VISIBLE,
ADD INDEX `custom_Games_gameID_idx` (`gameID` ASC) VISIBLE;
;
ALTER TABLE `hitCounter_dev`.`playersGames` 
ADD CONSTRAINT `custom_Users_userID`
  FOREIGN KEY (`userID`)
  REFERENCES `hitCounter_dev`.`users` (`userID`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `custom_Games_gameID`
  FOREIGN KEY (`gameID`)
  REFERENCES `hitCounter_dev`.`games` (`gameID`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

--
ALTER TABLE `hitCounter_dev`.`games` 
ADD INDEX `custom_userID_user_idx` (`userID` ASC) VISIBLE,
ADD INDEX `custom_gameTypeID_gameType_idx` (`gameTypeID` ASC) VISIBLE;
;
ALTER TABLE `hitCounter_dev`.`games` 
ADD CONSTRAINT `custom_games_userID_user`
  FOREIGN KEY (`userID`)
  REFERENCES `hitCounter_dev`.`users` (`userID`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `custom_games_gameTypeID_gameType`
  FOREIGN KEY (`gameTypeID`)
  REFERENCES `hitCounter_dev`.`gameTypes` (`gameTypeID`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
