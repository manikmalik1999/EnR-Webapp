const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User= require('../models/user');
const bcrypt= require("bcrypt");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");


router.post('/signup', (req, res, next)=>{
    User.find({email: req.body.email })
    .exec()
    .then(user =>{
        if (user.length>=1){
            return res.status(422).json({message: "User with this e-mail ID already exists"});}
        else{
            var transporter = nodemailer.createTransport({
                host: "gmail",
                port: 2525,
                auth: {
                    user: 'malikmanik41@gmail.com',
                    pass: ''
                }
              });
            
            var mailOptions = {
                from: 'malikmanik41@gmail.com',
                to: 'manikmalik123abc@gmail.com',
                subject: 'Sending Email using Node.js',
                text: 'That was easy!'
              };
              transporter.sendMail(mailOptions, (error, info)=>{
                if (error) {
                  console.log(error);
                  res.message("error")
                } else {
                  console.log('Email sent: ' + info.response);
                  res.message("sent")
                }
              });
        }

        // else{
        //     bcrypt.hash(req.body.password, 10, (err, hash)=>{
        //         if (err)
        //         {res.status(500).json({
        //             error: err
        //         });}
        //         else{
        //     const user = new User({
        //         _id: new mongoose.Types.ObjectId(),
        //         email: req.body.email,
        //         password: hash
        //     }); 
        //     user.save()
        //         .then(result =>{
        //             console.log(result);
        //             res.status(201).json({
        //                 message: 'User Created'
        //             });
        //         })
        //          .catch(err => {
        //             console.log(err);
        //             res.status(500).json({
        //               error: err
        //             });
        //           });
        //         }
        //   });
        // }
    })
});

router.get('/verify', (req,res, next)=>{

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