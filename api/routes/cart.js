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
                  console.log(product);
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
                    quantity: product.quantity
                    });
          return cart.save();
              }).then(result =>{
                console.log(result);
                res.status(201).json({
                    message:"Added to cart",
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
            return res.status(404).json({
                message: "Nothing found"
            });
        }
        cart.forEach((element) => {
            totalAmount = totalAmount + element.price;
        })
        res.status(200).json({
            count: cart.length,
            Price: totalAmount,
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
      Order.remove({_id: req.params.cartId}).exec()
      .then(result=>{
          res.status(200).json({
              message: "Product Removed",
              request: {
                  type: "POST",
                  url: "https://limitless-lowlands-36879.herokuapp.com/orders",
                  body: {productId: 'ID', quantity:'Number'} 
              }
          })
      })
      .catch(err=>{
          res.status(500).json({
              error: err
          });
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