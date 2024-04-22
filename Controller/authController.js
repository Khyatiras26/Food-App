const express = require('express');
const userModel = require('../Models/userModel')
const jwt = require('jsonwebtoken');
const JWT_KEY = require('D:/nodePractice/foodApp/secrets.js')


module.exports.signup = async function signup (req,res){

    try{
        let dataObj = req.body;
        let user =  await userModel.create(dataObj);
        console.log(user)
        if(user){
            res.json({
                message : "user signed up",
                data : user
            });
        }
        else{
            res.json({
                message : "error signing up user",
                
            });
        }
        
    }

    catch(err){
        res.status(500).json({
            message : err.message
        })
    }

}

module.exports.login = async function login(req,res) {

    try{
        const data = req.body;
        if(data.email){

            let user = await userModel.findOne({email : data.email});
            if(user){
                let uid= user['_id'];
                let token = jwt.sign({payload : uid}, JWT_KEY)
                res.cookie('login', token ,{httpOnly : true})
                if(user.password == data.password){
                    return res.json(({
                        message : "user has logged in",
                        userDetails : data
                    }))
                }
                else{
                    return res.json({
                        message : "wrong credentials"
                    })
                }
            }
            else{
                return res.json({
                    message : "Not an existing user"
                })
            }
        }
        else{
            return res.json({
                message : "Empty field found"
            })
        }
        
    }

    catch(err){
        return res.status(500).json({
            message : err.message
        })
    }
}

module.exports.isAuthorised = function isAuthorised(roles){
    return function(req,res,next){
        if(roles.include(req.role)){
            next();
        }
        else{
            res.status(401).json({
                message : "operation not allowed"
            })
        }
    }
}

module.exports.protectRoute = async function protectRoute(req,res,next){
    try{
        let token;
        if(req.cookies.login){
            console.log(req.cookies)
            token = req.cookies.login
            let payload = jwt.verify( token, JWT_KEY)

            if(payload){
            
                const user = await userModel.findById(payload.payload)
                req.role = user.role;
                req.id = user.id;

                next(); 
            }
            else{
                return res.json({
                    message : "user not verified"
                }) 
            }
            
        }
        else{
            return res.json({
                message : "Login again!!"
            })

        }
    }
    catch(err){
       res.json({
            message : err.message
       })
    }
}