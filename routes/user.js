


let user = require('../modules/user');
let game = require('../modules/game');
let tokenHelper = require('../helpers/token');
const { check, validationResult, body, header } = require('express-validator/check'); 
var express = require('express') 
var config = require('../config/dev.jsonConfig.json').signOn; 

var bodyParser = require('body-parser')
module.exports = function(app){


    app.get('/userData',
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
        .withMessage('Invalid token!!!'), 
    ]
    ,async function(req,res){
        res.header('Access-Control-Allow-Origin', '*');
        const errors = validationResult(req);
        console.log(errors.isEmpty(),"errors")
        if(errors.isEmpty()){
            const { token} = req.query;
            let tokenData = await tokenHelper.findUserFromToken(token); 
            let stats = await user.getUserData(tokenData.data.user);
            res.status(200).json(stats);

        } else{
            res.status(400).json({ errors: errors.array(),customMsg:"allGameType FAILED VALIDATION" });
        }

    })



}