const db  = require ('../helpers/db_connect');
const sendEmail = require('../helpers/email.js');
var Cryptr = require('cryptr'); 
const cryptr = new Cryptr('HitCounterKey');


async function createPlayer(gamerTag, email, password){

    password = cryptr.encrypt(password);
    // let sql = "Insert into "
    let emailverificationCode  = cryptr.encrypt(Math.floor((Math.random() * 10000000000000) + 1));
    let sql = "Insert into users (gamerTag,email,password,emailverificationCode,userType,status) Values('"+gamerTag+"','"+email+"','"+password+"','"+emailverificationCode+"','"+'player'+"','pre-active');" 
    
    console.log("sql",sql)
    let queryResult = await db.QueryDB(sql); 
    console.log(queryResult,"logsssss",queryResult);
    if (queryResult && queryResult.affectedRows==1){
        let emailResponseData = await sendEmail.createPlayerSendEmail(email,emailverificationCode,gamerTag) 
        console.log('email response',emailResponseData);
        if(emailResponseData.MessageId){ 
            return queryResult;
        }else{
            return null;
        }
        
    }else{
        null;
    } 
}

async function verifyPlayer(email,code){
    let sql = "Select emailverificationCode From users where email='"+email+"'"
    let queryResult = await db.QueryDB(sql);
    if(queryResult.length === 1 ){
        console.log(code," code ",  queryResult[0].emailverificationCode)
        let key = cryptr.decrypt(queryResult[0].emailverificationCode);
        let key2 = cryptr.decrypt(code);
        if (key === key2){
            let updateSql = "Update users Set status='active' Where email ='"+email+"';";
            let updateQueryResult = await db.QueryDB(updateSql);
            if(updateQueryResult.changedRows === 1){ 
                console.log(updateQueryResult,"results for update")
               return true;
            }else{
                console.log("failed to update  ",updateQueryResult,email)
                return false;
            } 
        }else{ 
            console.log("incorrect key ",key,key2,email)
            return false;
        }
    }else{
        console.log("error db response",queryResult)
        return false;
    } 
     

}


async function isEmailRegistered(email){
    let sql = "Select * From users where email='"+email+"'";
    let queryResult =  await db.QueryDB(sql);
    console.log(queryResult,"isEmailRegistered"); 
    if (queryResult.length == 1 ){
        return true;
    }else{
        return false;//failed
    }
     
}


async function checkCredentials(email,password){
    let sql = "Select password From users where email='"+email+"'";
    let queryResult = await db.QueryDB(sql)
    console.log(queryResult,"checkCredentials");
    if (queryResult.length == 1 && queryResult[0].password){
        let storedVal =cryptr.decrypt(queryResult[0].password);
        if(storedVal === password){
            return true;
        }else{
            return false;
        }
        console.log(storedVal,password," do they patch?")
    }else{
        return false;
    }
     
}


module.exports = {createPlayer,verifyPlayer,isEmailRegistered,checkCredentials}