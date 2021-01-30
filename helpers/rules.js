
var Cryptr = require('cryptr'); 
const cryptr = new Cryptr('HitCounterKey');


function convertMedicRules(rule){
    let medicRule ='';
    if(!rule.revive[0]){
        medicRule = 'There is NO MEDIC for this game.'
    }else{
        medicRule = 'MEDIC is Enabled, you can be mediced up to '+ rule.maxRevive +' times.'
                    +' It takes '+rule.timeToRevive +' seconds to be brought back to action' 
                    +' Your bleed out time is '+rule.bleedOutTime+ ' seconds'
    }
    return medicRule;
}

function covertSpawnRules(rule){
    // console.log(rule.respawn[0],"data")
    let spawnRule = ''
    if(!rule.respawn[0]){
        spawnRule = 'There is NO RESPAWN for this game.'
    }else{
        spawnRule = 'RESPAWN is Enabled, you can respawn up to '+ rule.maxRespawn +' times' 
    }
    return spawnRule;
}


function compareUsrData(oldData,newData){
    // cryptr.encrypt(password); 
    let finalData = {}
    oldData= oldData[0];
  
   finalData["pass"] = newData.newPass ? newData.newPass : null;
 
    //gamerTag
   finalData["gamer_tag"] = newData.gamer_tag ? newData.gamer_tag :oldData.gamerTag;
   finalData["clan_tag"] = newData.clan_tag ? newData.clan_tag :oldData.clanTag;
   finalData["about"] = newData.about ? newData.about :oldData.about;

   finalData["pass"] = newData.newPass ? newData.newPass : null;
   finalData["email_com"] = newData.email_com ? 1 : 0;
   finalData["promotional_com"] = newData.promotional_com ? 1 : 0;
   finalData["product_com"] = newData.product_com ? 1 : 0;


   finalData["facebook"] = newData.facebook ? newData.facebook : oldData.facebook;
   finalData["twitter"] = newData.twitter ? newData.twitter : oldData.twitter;
   finalData["youtube"] = newData.youtube ? newData.youtube : oldData.youtube;
 

   finalData["pfPic"] = newData.youtube ? newData.pfPic : oldData.profilepic;

   
   console.log(oldData,newData,"compare",finalData)

    return finalData;
}

module.exports={convertMedicRules,covertSpawnRules,compareUsrData}