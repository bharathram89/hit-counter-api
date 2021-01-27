
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
ALTER TABLE `hitCounter_dev`.`playerProfile` 
DROP FOREIGN KEY `custom_user_userid`;
ALTER TABLE `hitCounter_dev`.`playerProfile` 
DROP INDEX `custom_userID_user_profile_idx` ;
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
-- 
ALTER TABLE `hitCounter_dev`.`playerProfile` 
ADD INDEX `custom_userID_user_profile_idx` (`userID` ASC) VISIBLE
;
ALTER TABLE `hitCounter_dev`.`playerProfile` 
ADD CONSTRAINT `custom_user_userid`
  FOREIGN KEY (`userID`)
  REFERENCES `hitCounter_dev`.`users` (`userID`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;





-- 
-- 
-- 
-- BELOW TO DELETE ALL RECORDS AND RESET DEFAULTS

TRUNCATE `hitCounter_dev`.`users`;
TRUNCATE `hitCounter_dev`.`games`;
TRUNCATE `hitCounter_dev`.`playersGames`;
TRUNCATE `hitCounter_dev`.`gameTypes`;


Insert into users (gamerTag,email,password,status,userType) Values('global','sivhitcounter@gmail.com','2ac18a2caf5d7a49f541b3b16728d5241f62b20108f1b325c16b1e5db658b4786b2cfc898af426be03ae7bd57a58a9cbb6b846ead471e902d2439fff411b646a1f02b4d6399fe4391cd442960e299385898b61cd39fa0067fe81641d0dd2c77082ef590ded374c1f','active','player');
 
 Insert into gameTypes (revive,maxRevive,timeToRevive,bleedOutTime,respawn,maxRespawn,name,userID)
 Values  (1,2,15,120,1,2,"Medic",1),(0,null,null,null,0,null,"HardCore",1),(0,null,null,null,1,50,"TDM",1);
 
 Insert into gameTypes (revive,maxRevive,timeToRevive,bleedOutTime,respawn,maxRespawn,name,userID)
 Values  (1,1,5,10,0,null,"Users custom game",1)
    
 Insert into games Values(1,1,1,'','','active')
 
 