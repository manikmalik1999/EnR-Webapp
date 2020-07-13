const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const SellerAuth = require("../Middleware/check-auth-sellers")
const Cart = require("../models/cart");
const Order = require("../models/order");
const Product = require("../models/product")
const checkAuth = require("../Middleware/check-auth")
// Handle incoming GET requests to /orders
router.get('/',SellerAuth, (req, res, next) => {
    let revenue =0;
  Order.find({})
  .select('product _id userId quantity date')
  .populate('product','name _id price category')
  .populate('userId','name email')
  .exec()
  .then(docs =>{
      docs.forEach(element => {
          revenue = revenue + element.quantity*element.product.price;
      });
      res.status(200).json({
          revenue: revenue,
          count: docs.length,
          orders: docs
      });
  })
  .catch(err=>{
      res.status(500).json({
          error: err
      });
  });
});

router.post('/',checkAuth, (req, res, next) => {
    console.log(req.body.productId);
    const {userId}= req.userData;
    Product.findById(req.body.productId)
    .then(product =>{
        if (!product){
            res.status(404).json({
                message: "Product not found"
            });
            return;
        }
       
       console.log(userId);
                   // name: req.body.element.name,
            // description: req.body.element.description,
            // quantity: req.body.element.quantity,
            // price: req.body.element.price,
            // category: req.body.element.category,
            // sellerId: req.body.element.sellerId,
            // image: req.body.element.image,
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            product: req.body.productId,
            quantity: req.body.quantity,
            userId: userId
        })
       return  order.save();
        })
    
    .then(result =>{
        res.status(201).json({
            message:"Order Created",
        });
        Cart.deleteMany({userId: userId})
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
    });

// router.get('/:orderId', (req, res, next) => {
//   Order.findById(req.params.orderId)
//   .populate('product')
//   .exec()
//   .then(order =>{
//       if(!order){
//           return res.status(404).json({
//               message: "Order not found"
//           });
//       }
//       res.status(200).json({
//           order: order,
//           request: {
//               type: 'GET',
//               url: "https://limitless-lowlands-36879.herokuapp.com/orders"
//           }
//       })
//       .catch(err=>{
//           res.status(500).json({
//               error: err
//           });
//       });
//   });
//     });

    router.get('/myorder', checkAuth, (req, res, next) => {
        const {userId}= req.userData;
        console.log(userId);
        Order.find({userId: userId})
        .populate('product','name _id price image')
        .exec()
        .then(order =>{
            if(!order){
                return res.status(404).json({
                    message: "No Orders Yet"
                });
            }
            res.status(200).json({
                count: order.length,
                order: order,
                request: {
                    type: 'GET',
                    url: "https://limitless-lowlands-36879.herokuapp.com/orders"
                }
            })
        })
            .catch(err=>{
                res.status(500).json({
                    error: err
                });
            });
        
          });

router.delete('/:orderId', checkAuth,(req, res, next) => {
    Order.remove({_id: req.params.orderId}).exec()
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

module.exports = router;