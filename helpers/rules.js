
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

module.exports={convertMedicRules,covertSpawnRules}