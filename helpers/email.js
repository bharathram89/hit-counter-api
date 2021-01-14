const AWS = require('aws-sdk');
let createPlayerTemplate = require('../emailTemplates/createPlayerTemplate')
let config = require('../config/dev.jsonConfig.json').email;
const SES = new AWS.SES({region:config.SESregion});

AWS.config.update({
  accessKeyId: config.awsSecret,
  secretAccessKey: config.awsKey,
  region:config.SESregion
});

var Cryptr = require('cryptr'); 
const cryptr = new Cryptr('HitCounterKey');

function createPlayerSendEmail(ToEmailAddress,code,gamerTag){
  const htmlBody =  createPlayerTemplate.getCreatePlayerTemplate(config,ToEmailAddress,code,gamerTag);
  const fromBase64 = Buffer.from(config.hitCounterEmail).toString('base64');
  const params = {
    Destination: {
      ToAddresses: [ToEmailAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: htmlBody,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Hit Counter Registration Email',
      },
    }, 
    Source: `=?utf-8?B?${fromBase64}?= <`+config.hitCounterEmail+`>`,
  };

  console.log(params,"sesParams")
  return Promise.resolve(SES.sendEmail(params).promise())

}

 

module.exports = {createPlayerSendEmail}