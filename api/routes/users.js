const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User= require('../models/user');
const bcrypt= require("bcrypt");
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res, next)=>{
    User.find({email: req.body.email })
    .exec()
    .then(user =>{
        if (user.length>=1){
            return res.status(422).json({message: "mail exists"});}
        
        else{
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if (err)
                {res.status(500).json({
                    error: err
                });}
                else{
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            }); 
            user.save()
                .then(result =>{
                    console.log(result);
                    res.status(201).json({
                        message: 'User Created'
                    });
                })
                 .catch(err => {
                    console.log(err);
                    res.status(500).json({
                      error: err
                    });
                  });
                }
          });
        }
    })
});


router.post('/login', (req, res, next)=>{
    User.find({ email: req.body.email })
    .exec()
    .then(user =>{
        if(user.length<1){
            console.log("Is this the problem?");
            return res.status(401).json({message: 'Authorization Failed'});}

        bcrypt.compare(req.body.password , user[0].password, (err, result)=>{
            if (err){
                
                console.log(err);
                return res.status(401).json({
                    message: 'Authorization Failed'
                });}
                if(result){
                  
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                    );
                    return res.status(200).json({message: "Authorization Successful", token: token})
                }
                console.log("entering");
            res.status(401).json({
                
                message: 'Authorization Failed'
            });
            console.log("exit");
            });
    
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});




router.delete('/:userId', (req, res, next)=>{
    User.remove({_id: req.params.userId}).exec().
    then(result => {
        res.status(200).json({
            message: 'User deleted'
        });

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});




module.exports = router;