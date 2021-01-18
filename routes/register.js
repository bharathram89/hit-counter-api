

let user = require('../modules/user');
const { check, validationResult } = require('express-validator/check');
var express = require('express')
var router = express.Router()
 
module.exports = function(app){

  app.post('/user', [
    check('gamerTag')
      .exists()
      .isLength({ min: 4, max: 100 }) 
      .trim()
      .withMessage('Invalid Gamer Tag address!!!'),
    check('email')
      .exists()
      .isLength({ min: 6, max: 100 })
      .isEmail()
      .normalizeEmail()
      .trim()
      .withMessage('Invalid email address!!!'),
    check('password')
      .exists()
      .isLength({ min: 4, max: 25 })  
      .withMessage('Invalid password!!!'), 
    check('userType')
      .custom(value=>{
        return ['player','field'].includes(value); 
      })
      .exists()
      .isLength({ min: 4, max: 100 }) 
      .trim()
      .withMessage('Invalid Type address!!!')
    ],async function (req, res) {
      res.header('Access-Control-Allow-Origin', '*');
        
        const errors = validationResult(req);
        if(errors.isEmpty()){
          const { gamerTag, email, password, userType } = req.query
          let emailExists = await user.isEmailRegistered(email);
          console.log(emailExists,"data")
          if(!emailExists){
            let result = await user.createPlayer(gamerTag, email, password)
              console.log('in here')
              if(result){ 
                res.status(200).send(result);
              }else{
                res.status(400).send(result);
              }
            
          }else{
            res.status(400).json({ errors: errors.array(),customMsg:"Email Address already Registered" });
          }  
        }else{
          res.status(400).json({ errors: errors.array(),customMsg:"Create player Validation FAILED VALIDATION" });
        }
        
  });

  // 
  app.get('/verifyPlayer',[
    check('email')
      .exists()
      .isLength({ min: 6, max: 100 })
      .isEmail()
      .normalizeEmail()
      .trim()
      .withMessage('Invalid email address!!!'),
    check('code')
      .exists()
      .trim()
      .withMessage('No Code Found!!!')
  ],async function (req,res){
  
    res.header('Access-Control-Allow-Origin', '*');
    const errors = validationResult(req);
    if(errors.isEmpty()){
      const { email, code } = req.query

      let emailExists = await user.isEmailRegistered(email);
      if(emailExists){
        let result = await user.verifyPlayer(email,code)
        res.status(200).send(result); 
      }else{
        res.status(400).json({ errors: errors.array(),customMsg:"Email Address is NOT Registered" });
      }  
    }else{
      res.status(400).json({ errors: errors.array(),customMsg:"Create player Validation FAILED VALIDATION" });
    }
  
  })



// module.exports = router;

}