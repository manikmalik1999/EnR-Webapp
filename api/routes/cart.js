const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../Middleware/check-auth");
const Cart = require('../models/cart');
const User= require('../models/user');
const product = require("../models/product");

// router.get('/', (req, res, next) => {
//     Order.find()
//     .select('product quantity _id ordername rollNo Email mobileno')
//     .populate('product','name description quantity dataSheet')
//     .exec()
//     .then(docs =>{
//         res.status(200).json({
//             count: docs.length,
//             orders: docs.map(doc=> {
//                 return{
//                 _id: doc._id,
//                 product: doc.product,
//                 quantity: doc.quantity,
//                 ordername: doc.ordername,
//                 rollNo: doc.rollNo,
//                 Email: doc.Email,
//                 mobileno: doc.mobileno,
//             request: {
//                 type:'GET',
//                 url: "https://limitless-lowlands-36879.herokuapp.com/orders/"+ doc._id
//             }
//           }
//           }),
//         });
//     })
//     .catch(err=>{
//         res.status(500).json({
//             error: err
//         });
//     });
//   });

// _id: mongoose.Schema.Types.ObjectId,
// userid: {type: String, required: true },
// productid: {type: String, required: true},
// name: {type: String, required: true },
// description: {type: String, required: true },
// quantity: {type: Number, default: 1},
// price: {type: Number, required: true},
// category: {type: String, required: true },
// sellerId: {type: String, required: true },
// image: {type: String, required: false}
//5eee46d3440c8009d454c3cb
//5ee904f4b2a43a00504c671e
  router.post('/', (req, res, next) => {
      console.log(req.body.userId);
      console.log(req.body.productId);
      User.findById(req.body.userId)
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
                    userId: req.body.userId,
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
  
  router.get('/:userId', (req, res, next) => {
    Cart.find({userId: req.params.userId})
    .exec()
    .then(order =>{
        if(!order){
            return res.status(404).json({
                message: "Nothing found"
            });
        }
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url: "https://limitless-lowlands-36879.herokuapp.com/orders"
            }
        })
        .catch(err=>{
            res.status(500).json({
                error: err
            });
        });
    });
      });
  
  
  router.delete('/:cartId', checkAuth,(req, res, next) => {
      Order.remove({_id: req.params.cartId}).exec()
      .then(result=>{
          res.status(200).json({
              message: "Order Deleted",
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
  
      router.get("/", (req, res, next) => {
        Cart.find()
        .select('')
          .exec()
          .then(docs => {
            const response = {
              count: docs.length,
              cart: docs
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

  module.exports = router;