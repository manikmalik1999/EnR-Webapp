const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Admin= require('../models/admin');
const bcrypt= require("bcrypt");
const jwt = require('jsonwebtoken');

// router.post('/signup', (req, res, next)=>{
//     Admin.find({email: req.body.email })
//     .exec()
//     .then(user =>{
//         if (user.length>=1){
//             return res.json({message: "Profile with this email exists", status: 422}).status(422);}
        
//         else{
//             bcrypt.hash(req.body.password, 10, (err, hash)=>{
//                 if (err)
//                 {res.status(500).json({
//                     error: err
//                 });}
//                 else{
//             const user = new Admin({
//                 _id: new mongoose.Types.ObjectId(),
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: hash
//             }); 
//             user.save()
//                 .then(result =>{
//                     console.log(result);
//                     res.status(201).json({
//                         message: 'Seller Profile Created',
//                         status: 201
//                     });
//                 })
//                  .catch(err => {
//                     console.log(err);
//                     res.status(500).json({
//                       message: err,
//                       status: 500
//                     });
//                   });
//                 }
//           });
//         }
//     })
// });


router.post('/login', (req, res, next)=>{
  Admin.find({ email: req.body.email })
  .exec()
  .then(user =>{
      if(user.length<1){
          return res.json({message: 'Authorization Failed', status: 401}).status(401);}

      bcrypt.compare(req.body.password , user[0].password, (err, result)=>{
          if (err){
              
              console.log(err);
              return res.json({
                  message: 'Authorization Failed',
                  status: 401
              }).status(401);}

          else if(result){
                
                  const token = jwt.sign({
                      name: user[0].name,
                      email: user[0].email,
                      userId: user[0]._id
                  }, 
                  process.env.JWT_SELLER_KEY,
                  {
                      expiresIn: "5h"
                  }
                  );
              return res.json({message: "Authorization Successful", token: token}).status(200);
          }
          else{

          res.json({
              
              message: 'Authorization Failed',
              status: 401
          }).status(401);
      }
          });
      
  })
  .catch(err => {
      res.status(500).json({
        error: err,
        message: err,
        status: 401
      });
    });
});




module.exports = router;