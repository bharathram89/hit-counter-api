


let user = require('../modules/user');
let game = require('../modules/game');
let tokenHelper = require('../helpers/token');
const { check, validationResult } = require('express-validator/check'); 
var express = require('express') 
var config = require('../config/dev.jsonConfig.json').signOn; 

module.exports = function(app){


    app.get('/allGameType',
        [ 
        check('token')
            .custom(token => {
                let isTokenValid = tokenHelper.validateToken(token);
                if(isTokenValid){
                    return true; 
                }else{ 
                    return Promise.reject('Invalid Token');
                }
            })
            .exists()
            .isLength({ min:15, max: 200 }) 
            .trim()
            .withMessage('Invalid token!!!')
            
        ]
        ,function(req,res){
            const errors = validationResult(req);
            if(errors.isEmpty()){
                const { token } = req.query;
                let tokenData = tokenHelper.findUserFromToken(token);
                
                res.send(200);
 
            } else{
                res.status(400).json({ errors: errors.array(),customMsg:"allGameType FAILED VALIDATION" });
            }

    })
}