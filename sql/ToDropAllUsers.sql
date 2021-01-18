
-- Remove all relationships
ALTER TABLE `hitCounter_dev`.`gameTypes` 
DROP FOREIGN KEY `custom_gameType_user`;
ALTER TABLE `hitCounter_dev`.`gameTypes` 
DROP INDEX `custom_gameType_user_idx` ;
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
