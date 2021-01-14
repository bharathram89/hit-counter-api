
-- Below removes the Forigin key on gameTypes to user.  
ALTER TABLE `hitCounter_dev`.`gameTypes` 
DROP FOREIGN KEY `custom_gameType_user`;
ALTER TABLE `hitCounter_dev`.`gameTypes` 
DROP INDEX `custom_gameType_user_idx` ;
;

-- Below adds the Forigin key on gameTypes to user.  
ALTER TABLE `hitCounter_dev`.`gameTypes` 
ADD INDEX `custom_gameType_user_idx` (`userID` ASC) VISIBLE;
;
ALTER TABLE `hitCounter_dev`.`gameTypes` 
ADD CONSTRAINT `custom_gameType_user`
  FOREIGN KEY (`userID`)
  REFERENCES `hitCounter_dev`.`users` (`userID`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
