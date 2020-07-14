const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../Middleware/check-auth");
const Wishlist= require('../models/wishlist');
const User= require('../models/user');
const product = require("../models/product");

  router.post('/',checkAuth, (req, res, next) => {
    const {userId} = req.userData;
      console.log(req.body.productId);
      User.findById(userId)
      .then(user =>{
          if (!user){
              return res.status(404).json({
                  message: "User not found"
              });
          }
          else{
              product.findById(req.body.productId)
              .then(product =>{
                  if(!product){
                    return res.status(404).json({
                        message: "product Not found"
                    });
                  }
                const wishlist = new Wishlist({
                    _id: mongoose.Types.ObjectId(),
                    userId: userId,
                    productId: product._id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    category: product.category,
                    sellerId: product.sellerId,
                    image: product.image,
                    });
          return wishlist.save();
              }).then(result =>{
                console.log(result);
                res.status(201).json({
                    message:"Added to wishlist",
                    status: 201
                });
            })
          }
      })
      
      .catch(err=>{
        //   console.log(err);
          res.status(500).json({
              error: err
          });
      });
      
      });
  
  router.get('/', checkAuth, (req, res, next) => {
      const {userId} = req.userData;
    Wishlist.find({userId: userId})
    .exec()
    .then(cart =>{
        if(!cart){
            return res.json({
                message: "Nothing found"
            }).status(404);
        }
        res.status(200).json({
            count: cart.length,
            userId: userId,
            wishlist: cart,
        })

    }).catch(err=>{
        res.status(500).json({
            error: err
        });
    });
      });
  
  
  router.delete('/:cartId', checkAuth,(req, res, next) => {
      Wishlist.deleteOne({_id: req.params.cartId}).exec()
      .then(result=>{
          res.status(200).json({
              message: "Removed",
              status: 200,
            //   request: {
            //       type: "POST",
            //       url: "https://limitless-lowlands-36879.herokuapp.comorders",
            //       body: {productId: 'ID', quantity:'Number'} 
            //   }
          })
      })
      .catch(err=>{
          res.json({
              message: err,
              status: 500
          }).status(500);
      });
      });
  
    //   router.get("/", (req, res, next) => {
    //     Cart.find()
    //     .select('')
    //       .exec()
    //       .then(docs => {
    //         const response = {
    //           count: docs.length,
    //           cart: docs
    //         };
    //           if (docs.length >= 0) {
    //         res.status(200).json(response);
    //           } else {
    //               res.status(404).json({
    //                   message: 'No entries found'
    //               });
    //           }
    //       })
    //       .catch(err => {
    //         console.log(err);
    //         res.status(500).json({
    //           error: err
    //         });
    //       });
    //     });

  module.exports = router;