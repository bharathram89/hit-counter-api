


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
        ,async function(req,res){
            res.header('Access-Control-Allow-Origin', '*');
            const errors = validationResult(req);
            console.log(errors.isEmpty(),"errors")
            if(errors.isEmpty()){
                const { token } = req.query;
                let tokenData = await tokenHelper.findUserFromToken(token); 
                let games = await game.getAllGames(tokenData.data.user)
                console.log( games,"data")
                res.status(200).json(games);
 
            } else{
                res.status(400).json({ errors: errors.array(),customMsg:"allGameType FAILED VALIDATION" });
            }

    })



    app.get('/gameConfig',
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
    check('gameTypeID')
        .exists()
        .trim()
        .withMessage('No gameTypeID Found!!!')
    ]
    ,async function(req,res){
        res.header('Access-Control-Allow-Origin', '*');
        const errors = validationResult(req);
        console.log(errors.isEmpty(),"errors")
        if(errors.isEmpty()){
            const { gameTypeID } = req.query;
            let config = await game.getGameConfig(gameTypeID)
            console.log( config,"data")
            res.status(200).json(config);

        } else{
            res.status(400).json({ errors: errors.array(),customMsg:"allGameType FAILED VALIDATION" });
        }

    })



    app.post('/startGame',
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
    check('gameTypeID')
        .exists()
        .trim()
        .withMessage('No gameTypeID Found!!!')
    ]
    ,async function(req,res){
        res.header('Access-Control-Allow-Origin', '*');
        const errors = validationResult(req);
        console.log(errors.isEmpty(),"errors")
        if(errors.isEmpty()){
            const { token, gameTypeID } = req.query;
            let tokenData = await tokenHelper.findUserFromToken(token); 
            let config = await game.startGame(tokenData.data.user,gameTypeID)
            console.log( config,"data")
            res.status(200).json(config);

        } else{
            res.status(400).json({ errors: errors.array(),customMsg:"allGameType FAILED VALIDATION" });
        }

    })

 
}