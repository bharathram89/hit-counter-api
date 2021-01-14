// import { createPlayerTemplate } from './createPlayerTemplateObj'
let createPlayerTemplate = require('./createPlayerTemplateObj');


function getCreatePlayerTemplate(config,email,code,gamerTag){
    let obj = createPlayerTemplate.createPlayerTemplateHTML;
    // if(obj.indexOf('{buttonUrl}')){ 
    //     console.log(obj.indexOf('{buttonUrl}')," fraking a", obj.replace('{buttonUrl}',config.UrlToConfirmEmailPage+"?code="+code+"&email="+email))
    // }
    // if(obj.indexOf('{gameTag}')){ 
    //     obj.replace('{gameTag}',gamerTag);
    // } 
    // console.log(obj,"Final HTML")
     return obj.replace('{buttonUrl}',config.UrlToConfirmEmailPage+"?code="+code+"&email="+email).replace('{gameTag}',gamerTag);;
}

module.exports = {getCreatePlayerTemplate}
