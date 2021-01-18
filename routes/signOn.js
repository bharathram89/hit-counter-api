

let user = require('../modules/user');
let tokenHelper = require('../helpers/token');
const { check, validationResult } = require('express-validator/check');
var jwt = require('jsonwebtoken'); 
var express = require('express')
var router = express.Router()
var config = require('../config/dev.jsonConfig.json').signOn;
 
module.exports = function(app){

    app.post('/signOn', [
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
          .withMessage('Invalid Type!!!')
        ],async function (req, res) {
        
            res.header('Access-Control-Allow-Origin', '*')
            res.header('Access-Control-Expose-Headers',"hit-token")
        const errors = validationResult(req);
        if(errors.isEmpty()){
            const { email, password, userType } = req.query
            let emailExists = await user.isEmailRegistered(email);
            if(emailExists){
                let credentialTestResult = await user.checkCredentials(email,password)
                    if(credentialTestResult){
                        let token = await tokenHelper.createToken(email,config.Sessiontime);
                        console.log(req.query,"data",token); 
                        res.header('hit-token',token);
                        res.status(200).send({email:email});
                    }else{
                        res.status(400).json({ errors: errors.array(),customMsg:"Incorrect email or password" });
                    } 
            }else{ 
                res.status(400).json({ errors: errors.array(),customMsg:"Email Address is NOT Registered" });
            } 
            
            // });
        }else{
            res.status(400).json({ errors: errors.array(),customMsg:"SignIn FAILED VALIDATION" });
        }
        
    });


//validates Token to see if its valid
    app.get('/verifyToken',[ 
        check('token')
            .exists()
            .isLength({ min:15, max: 200 }) 
            .trim()
            .withMessage('Invalid token!!!')
        ],async function(req,res){

            res.header('Access-Control-Allow-Origin', '*')
            const errors = validationResult(req);
            if(errors.isEmpty()){
                const { token } = req.query;
                 let userObj = await tokenHelper.findUserFromToken(token);
                console.log(userObj,"user");
                if(userObj && userObj.data && userObj.data.user){
                    let verifiedUser = await user.isEmailRegistered(userObj.data.user);
                    if(verifiedUser){ 
                        res.status(200).json({ user:userObj.data.user }); 
                    }else{
                        res.status(400).json({ errors: errors.array(),customMsg:"Token FAILED VALIDATION" }); 
                    } 
                }else{
                    res.status(400).json({ errors: errors.array(),customMsg:"Token FAILED VALIDATION" }); 
                }
            } else{
                res.status(400).json({ errors: errors.array(),customMsg:"SignIn FAILED VALIDATION" });
            }

    })
}
