var jwt = require('jsonwebtoken');
var user = require('../modules/user')
var config = require('../config/dev.jsonConfig.json').token;

 

function findUserFromToken(token){
    return jwt.verify(token,config.jwtKey,(err,user)=>{
        if(err){
            console.log(err,"error")
            return false;
        } else{ 
            return user;
        }
    })
}
 
function createToken(user,time){ 
    let token = jwt.sign({
        data: {user:user}
    }, config.jwtKey, { expiresIn: time });
    return token;

}

async function validateToken(token){
    let tokenData = await jwt.verify(token,config.jwtKey);
    console.log(tokenData,"data")
    let matchedUser = await user.isEmailRegistered(tokenData.data.user)
    if(matchedUser){
        return true
    }else{
        return false
    }

}


module.exports={createToken,findUserFromToken,validateToken}