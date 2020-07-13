const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../Middleware/check-auth");
const Cart = require('../models/cart');
const User= require('../models/user');
const product = require("../models/product");

  router.post('/',checkAuth, (req, res, next) => {
    const {userId} = req.userData;
      console.log(req.body.productId);
      Cart.find({userId: userId, productId: req.body.productId})
      .then(result =>{
        if(result.length>=1){
            res.json({
                  
                  message: "Already added to cart"
              }).status(401);
               return;
          }
          else{
              product.findById(req.body.productId)
              .then(product =>{
                  if(!product){
                    return res.status(404).json({
                        message: "product Not found"
                    });
                  }
                  console.log(product);
                if(req.body.quantity === 0){
                    return res.json({
                        message: "Select Some quantity"
                    }).status(404);
                }
                if(req.body.quantity > product.quantity){
                    return res.json({
                        message: "Quantity not available"
                    }).status(404);
                }
                const cart = new Cart({
                    _id: mongoose.Types.ObjectId(),
                    userId: userId,
                    productId: product._id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    category: product.category,
                    sellerId: product.sellerId,
                    image: product.image,
                    quantity: req.body.quantity,
                    maxQuanity: product.quantity
                    });
          return cart.save();
              }).then(result =>{
                // console.log(result);
                res.status(201).json({
                    message:"Added to cart",
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
      let totalAmount = 0;
    Cart.find({userId: userId})
    .exec()
    .then(cart =>{
        if(!cart){
            return res.json({
                message: "Nothing found"
            }).status(404);
        }
        cart.forEach((element) => {
            totalAmount = totalAmount + element.price* element.quantity;
        })
        res.status(200).json({
            count: cart.length,
            Price: totalAmount,
            userId: userId,
            cart: cart,
            request: {
                type: 'GET',
                url: "https://limitless-lowlands-36879.herokuapp.com/orders"
            }
        })

    }).catch(err=>{
        res.status(500).json({
            error: err
        });
    });
      });
  
  
  router.delete('/:cartId', checkAuth,(req, res, next) => {
      Cart.deleteOne({_id: req.params.cartId}).exec()
      .then(result=>{
          res.status(200).json({
              message: "Removed",
              status: 200,
              request: {
                  type: "POST",
                  url: "https://limitless-lowlands-36879.herokuapp.com/orders",
                  body: {productId: 'ID', quantity:'Number'} 
              }
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