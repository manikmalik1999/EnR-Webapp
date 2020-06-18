const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User= require('../models/user');
const bcrypt= require("bcrypt");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const checkAuth = require("../Middleware/check-auth");
const { path } = require("../../app");


router.post('/signup', (req, res, next)=>{
    User.find({email: req.body.email })
    .exec()
    .then(user =>{
        console.log(process.env.DOMAIN_SERVER);
        if (user.length>=1){
            return res.json({message: "User with this e-mail ID already exists"}).status(422);}
        else{

            const token = jwt.sign({
                email: req.body.email,
                password: req.body.password
            },process.env.EMAIL_VERIFY ,
            {
                expiresIn: '10m'
            })

            var transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                auth: {
                    user: process.env.EMAIL_ID,
                    pass: process.env.EMAIL_PASS
                }
              });
            
            var mailOptions = {
                from:  process.env.EMAIL_ID,
                to: req.body.email,
                subject: 'Account Activation Link',
                html: `
                    <h2>Please click on the given link to activate account.</h2>
                    <a href="${process.env.DOMAIN_CLIENT}/evef/${token}">Activate Account</a>
                `
              };
              transporter.sendMail(mailOptions, (error, info)=>{
                if (error) {
                  console.log(error);
                  res.status(500).json({error : error})
                } else {
                  console.log('Email sent: ' + info.response);
                    res.status(201).json({message: 'Email Sent'})
                }
              });
        } 
    })
});

router.post('/verify', (req,res, next)=>{
    const {token} = req.body;
    if(token){
        jwt.verify(token, process.env.EMAIL_VERIFY, (err, decodedtoken)=>{
            if(err)
                return res.status(400).json({Error: "Incorrect or Expired link"})
            
            const {email, password}= decodedtoken;
            User.find({email: email })
            .exec()
            .then(user =>{
                if (user.length>=1){
                    return res.status(402).json({message: "User with this e-mail ID already exists"});}
                else {
                    bcrypt.hash(password, 10, (err, hash)=>{
                        if (err)
                        {res.status(500).json({
                            error: err
                        });}
                        else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: email,
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
        })
    }
    else {
        return res.status(400).json({message: "Incorrect or expired token"})
    }
})

router.post('/forgotpass',(req,res,next)=>{
    const {email}= req.body;
    User.findOne({email}, (err, user)=>{
        if(err || !user){
            return res.status(402).json({message: "User with this e-mail ID doesn't exist"});
        }
        else{

            const token = jwt.sign({
                email: email,
            },process.env.EMAIL_VERIFY ,
            {
                expiresIn: '10m'
            })
            var transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                auth: {
                    user: process.env.EMAIL_ID,
                    pass: process.env.EMAIL_PASS
                }
              });
            
            var mailOptions = {
                from: process.env.EMAIL_ID,
                to: req.body.email,
                subject: 'Reset Password',
                html: `
                    <h2>Please click on the given link to reset password</h2>
                    <p>If you havent requested for the password reset it is adviced you change your password immediately</p>
                    <a href="${process.env.DOMAIN_CLIENT}/resetpass/${token}">Reset My password</a>
                `
              };
              transporter.sendMail(mailOptions, (error, info)=>{
                if (error) {
                  console.log(error);
                  res.status(500).json({error : error})
                } else {
                  console.log('Email sent: ' + info.response);
                    res.status(201).json({message: 'Link Sent at your Email ID, Please Check!' })
                }
              });
        }
    })
})

router.post('/resetPass', (req, res, next)=>{
    const {token}= req.body;
    jwt.verify(token, process.env.EMAIL_VERIFY, (err, decodedtoken)=>{
        if(err)
           { return res.status(400).json({message: "Incorrect or Expired link"})}
        const {email}= decodedtoken;
        const {password}= req.body;
                bcrypt.hash(password, 10, (err, hash)=>{
                    if (err)
                    {res.status(500).json({
                        message: err
                    });
                    console.log(err);}
                    else{
             
                User.updateOne({ email: email }, { password: hash } )
                    .then(result =>{
                        res.status(201).json({
                            message: 'Password Updated'
                        });
                    })
                     .catch(err => {
                        res.status(500).json({
                          message: err
                        });
                        console.log("updateone");
                        console.log(err);
                      });
                    }
                });
                
           
            
    })
})

router.post('/login', (req, res, next)=>{
    User.find({ email: req.body.email })
    .exec()
    .then(user =>{
        if(user.length<1){
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
            });
    
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});




router.delete('/:userId',checkAuth, (req, res, next)=>{
    User.remove({_id: req.params.userId}).exec().
    then(res => {
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