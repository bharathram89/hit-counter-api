


let user = require('../modules/user');
let game = require('../modules/game');
let tokenHelper = require('../helpers/token');
const { check, validationResult, body, header } = require('express-validator/check'); 
var express = require('express') 
var config = require('../config/dev.jsonConfig.json').signOn; 

var bodyParser = require('body-parser')
module.exports = function(app){

    var jsonParser = bodyParser.json()
    var urlencodedParser = bodyParser.urlencoded({ extended: false })
    // app.use(jsonParser) 
    // app.use(urlencodedParser)
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



    app.post('/gameOver',jsonParser,
    [ 
    check('token')
        .custom(token => {
            let isTokenValid = tokenHelper.validateToken(token);
            if(isTokenValid){
                return true; 
            }else{ 
                return true //Promise.reject('Invalid Token');
            }
        })
        .exists()
        .isLength({ min:15, max: 200 }) 
        .trim() 
        .withMessage('Invalid token!!!'),
    body('gameid')
        .exists()
        .trim()
        .withMessage('No gameID Found!!!'),
    body('stats')
        .custom(stats => {
            if(stats.totalKills == undefined || stats.totalDeath == undefined ){ 
                return true //Promise.reject('Invalid STATS');
            }else{
                return true;
            } 
        })
        .exists()
        .trim()
        .withMessage('No Stats Found!!!')
        
    ],
    async function(req,res){
        res.header('Access-Control-Allow-Origin', '*'); 
        res.header('Access-Control-Allow-Headers', 'Content-Type'); 
        console.log(req.body,"req")
        const errors = validationResult(req);
        console.log(errors.isEmpty(),"errors")
        if(errors.isEmpty()){ 
            const { token} = req.query;
            const { gameid , stats} = req.body;
            console.log(gameid,token,stats,":vas")
            let tokenData = await tokenHelper.findUserFromToken(token); 
            let config = await game.gameOver(tokenData.data.user,gameid, stats) 
            console.log( config,"data gameOver")
            res.status(200).json(config);

        } else{
            res.status(400).json({ errors: errors.array(),customMsg:"allGameType FAILED VALIDATION" });
        }

    }) 


    app.options('/gameOver',
    [ ],(req,res)=>{
        
        res.header('Access-Control-Allow-Origin', '*'); 
        res.header('Access-Control-Allow-Headers', 'Content-Type'); 
        res.status(200).json({});
    })

}