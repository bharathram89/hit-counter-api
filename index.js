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

// app.use('/portal',secureRoutes);
// app.use('/signOn',signOnRoutes); 

if(process.argv && process.argv[2] === "local"){
  app.listen(3000, () => console.log(`Listening on: 3000`));
}else{
  module.exports.handler = serverless(app);
}

// 