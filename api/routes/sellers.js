const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Seller= require('../models/seller');
const bcrypt= require("bcrypt");
const jwt = require('jsonwebtoken');
const SellerAuth = require("../Middleware/check-auth-sellers");
const Product = require("../models/product");

router.post('/signup', (req, res, next)=>{
    Seller.find({email: req.body.email })
    .exec()
    .then(user =>{
        if (user.length>=1){
            return res.json({message: "Profile with this email exists", status: 422}).status(422);}
        
        else{
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if (err)
                {res.status(500).json({
                    error: err
                });}
                else{
            const user = new Seller({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                password: hash
            }); 
            user.save()
                .then(result =>{
                    console.log(result);
                    res.status(201).json({
                        message: 'Seller Profile Created',
                        status: 201
                    });
                })
                 .catch(err => {
                    console.log(err);
                    res.status(500).json({
                      message: err,
                      status: 500
                    });
                  });
                }
          });
        }
    })
});


router.post('/login', (req, res, next)=>{
  Seller.find({ email: req.body.email })
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
              return res.json({message: "Authorization Successful", token: token, id: user[0]._id}).status(200);
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





router.delete('/:sellerId', (req, res, next)=>{
    Seller.remove({_id: req.params.sellerId}).exec().
    then(result => {
        res.status(200).json({
            message: 'Seller Profile deleted'
        });

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});

router.get("/", (req, res, next) => {
    Seller.find()
    .select('name email')
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          users: docs
        };
          if (docs.length >= 0) {
        res.status(200).json(response);
          } else {
              res.status(404).json({
                  message: 'No entries found'
              });
          }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    });


    router.get("/myinfo",SellerAuth, (req, res, next) => {
        const {userId} = req.userData;
        Seller.findById(userId)
        .select('name email')
          .exec()
          .then(docs => {
              console.log(docs);
            if (docs) {
                res.status(200).json({
                  sellers: docs,
                });
                
              } else {
                res
                  .status(404)
                  .json({ message: "No valid entry found for provided ID" });
              }
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({ error: err });
            });
        });


        router.get("/products",SellerAuth, (req, res, next) => {
          const {userId}= req.userData;
          console.log(userId);
          console.log("debugging");
          Product.find({sellerId : mongoose.Types.ObjectId(userId)})
          .select('name price _id quantity category sellerId description image approved')
          .populate('sellerId', 'name')
            .exec()
            .then(doc => {
              console.log("From database", doc);
              if (doc) {
                res.status(200).json({
                  product: doc,
                });
                
              } else {
                res
                  .status(404)
                  .json({ message: "No valid entry found for provided ID" });
              }
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({ error: err });
            });
        });

        router.get("/products/:sellerId",SellerAuth, (req, res, next) => {
          const userId = req.params.sellerId;
          console.log(userId);
          console.log("debugging");
          Product.find({sellerId : mongoose.Types.ObjectId(userId)})
          .select('name price _id quantity category sellerId description image approved')
          .populate('sellerId', 'name email')
            .exec()
            .then(doc => {
              console.log("From database", doc);
              if (doc) {
                res.status(200).json({
                  product: doc,
                });
                
              } else {
                res
                  .status(404)
                  .json({ message: "No valid entry found for provided ID" });
              }
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({ error: err });
            });
        });

module.exports = router;