


let user = require('../modules/user');
let game = require('../modules/game');
let tokenHelper = require('../helpers/token');
let helper = require('../helpers/rules');
const { check, validationResult, body, header } = require('express-validator/check'); 
var express = require('express') 
var config = require('../config/dev.jsonConfig.json').signOn; 

var bodyParser = require('body-parser')
module.exports = function(app){


    var jsonParser = bodyParser.json()
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



    app.post('/profile',jsonParser,
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
    body('profile')
        .custom(profileData => {

           return true;
        })
        .exists() 
        .trim()
        .withMessage('Invalid profile data!!!'), 
    ]
    ,async function(req,res){
        res.header('Access-Control-Allow-Origin', '*'); 
        res.header('Access-Control-Allow-Headers', 'Content-Type'); 
        const errors = validationResult(req);
        console.log(errors.isEmpty(),"errors")
        if(errors.isEmpty()){
            const { token} = req.query;

            const { profile } = req.body;
            let tokenData = await tokenHelper.findUserFromToken(token);  

            //get user data and match to datat we got to see what is the final data we neeed to send below
            

            //validate user with old password if its there
            if(profile.oldPass && profile.newPass){
                let isValid = await user.checkCredentials(tokenData.data.user,profile.oldPass)
                if(!isValid){ 
                    res.status(500).json({ errors: errors.array(),customMsg:"old pass sent is invalid function FAILED" });
                }
            }
            let currentUsrData = await user.getUserData(tokenData.data.user);
 
            let finalData = helper.compareUsrData(currentUsrData,profile);
            if(finalData){
                let resp = await user.setProfile(tokenData.data.user,finalData.gamer_tag,finalData.clan_tag,finalData.about,finalData.pass,finalData.email_com,finalData.promotional_com,finalData.product_com,finalData.facebook,finalData.twitter,finalData.youtube,finalData.pfPic);
                res.status(200).json(resp);
            }else{

                res.status(400).json({ errors: errors.array(),customMsg:"profile compareUsrData function FAILED" });
            }
           
        } else{
            res.status(400).json({ errors: errors.array(),customMsg:"profile FAILED VALIDATION" });
        }

    })


//BELOW NEEDS TO BE THERE FOR THE profile OVER ROUTE TO GET THE BODY DATA
app.options('/profile',
[ ],(req,res)=>{
    
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Headers', 'Content-Type'); 
    res.status(200).json({});
})


}