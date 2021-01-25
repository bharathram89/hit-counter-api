const e = require('express');
const db  = require ('../helpers/db_connect');
const rules  = require ('../helpers/rules');
const game = require('../routes/game');

async function getAllGames(userEmail){ 
    let sql = "select name,revive,maxRevive,timeToRevive,bleedOutTime,respawn,maxRespawn,gameTypeID from gameTypes gt Left JOIN users u on gt.userID = u.userID Where gt.userID IS NULL or  u.email='"+userEmail+"'"
    let playersGameTypes = await db.QueryDB(sql);
    let games = []
    playersGameTypes.forEach(gameType => {
        let medicRule = rules.convertMedicRules(gameType);
        let spawnRule = rules.covertSpawnRules(gameType);
        console.log(medicRule,spawnRule)
        games.push({id:gameType.gameTypeID,name:gameType.name,spawn:spawnRule,medic:medicRule})
    });
    return games; 
}

async function getGameConfig(gameTypeID){
    let sql = "select name,revive,maxRevive,timeToRevive,bleedOutTime,respawn,maxRespawn,gameTypeID from gameTypes Where gameTypeID = "+gameTypeID
    let gameConfig = await db.QueryDB(sql);
    if(gameConfig.length==1){
        return gameConfig;
    }else{
        return false;
    }
    
}


async function startGame(userEmail,gameTypeID){
    let sql = "call newGamePlayer ("+gameTypeID+",'"+userEmail+"')"
    console.log(sql," proc run sql startGame")
    let newGameID = await db.QueryDB(sql);
    console.log(newGameID[0],"newGameID startGame")
    if(newGameID[0] && newGameID[0][0] && newGameID[0][0].gID){
        return newGameID[0];
    }else{
        return false;
    }
}

async function gameOver(userEmail,gameID,stats){
    let sql = "call UpdateActiveGameToComplete ("+gameID+","+stats.totalKills+","+ stats.totalRevived +","+ stats.totalRespawn +","+ stats.totalMediced +","+ stats.totalDeath +")"
    console.log(sql," proc run gameOver " +sql)
    let resp = await db.QueryDB(sql);
    console.log("resp from db for gameOver ",resp)
    if(resp){
        return true;
    }else{
        return false
    }
}
module.exports={getAllGames,getGameConfig,startGame,gameOver}