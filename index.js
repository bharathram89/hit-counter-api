'use strict';

require('dotenv').config()
const serverless = require('serverless-http');
const express = require('express');
const app = express(); 

 require('./routes/register.js')(app);
 require('./routes/signOn.js')(app);
 require('./routes/game.js')(app);
 require('./routes/stats.js')(app);
 require('./routes/user.js')(app);

// var router = express.Router()


// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })
// If the response lacks a Vary: header, fix it in a CloudFront Origin Response trigger.

// exports.handler = (event, context, callback) => {
//   const response = event.Records[0].cf.response;
//   const headers = response.headers;

//   if (!headers['vary'])
//   {
//       headers['vary'] = [
//           { key: 'Vary', value: 'Access-Control-Request-Headers' },
//           { key: 'Vary', value: 'Access-Control-Request-Method' },
//           { key: 'Vary', value: 'Origin' },
//       ];
//   }
//   callback(null, response);
// };
// app.use('/portal',secureRoutes);
// app.use('/signOn',signOnRoutes); 

if(process.argv && process.argv[2] === "local"){
  app.listen(3000, () => console.log(`Listening on: 3000`));
}else{
  module.exports.handler = serverless(app);
}

// 