const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Review = require("../models/reviews");
const User = require("../models/user")
const checkAuth = require("../Middleware/check-auth");
const SellerAuth = require("../Middleware/check-auth-sellers")
const product = require('../models/product');
// Handle incoming GET requests to /orders
router.get('/', (req, res, next) => {
  Review.find()
  .select('product _id userId value comment')
  .populate('product','name _id price')
  .populate('user', 'name _id')
  .exec()
  .then(docs =>{
      res.status(200).json({
          count: docs.length,
          reviews: docs
      });
  })
  .catch(err=>{
      res.status(500).json({
          error: err
      });
  });
});

router.post('/',checkAuth, (req, res, next) => {
  
    const {userId}= req.userData;  
        Review.find({user: userId })
        .exec()
        .then(result =>{
            if(result.length>=1){
              res.json({
                    
                    message: "You can't add more reviews for this product"
                }).status(401);
                 return;
            }
            else{
        
            console.log("Why here");
            const review = new Review({
                _id: mongoose.Types.ObjectId(),
                value: req.body.value,
                product: req.body.productId,
                user: userId,
                comments: req.body.comment
            })
            review.save() 
            .then(result =>{
                res.status(201).json({
                    message:"Review Submitted",
                });
            })
            
        }
    

    })

    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
    });



    router.get('/:productId', (req, res, next) => {
        const productId = req.params.productId;
        
        Review.find({product: productId})
        .select('value user comments')
        .populate('user','name')
        .exec()
        .then(review =>{
            if(!review){
                return res.status(404).json({
                    message: "No reviews Yet"
                });
            }
            let avg=0;
            review.forEach(element => {
                avg = avg + element.value;
            });
            res.status(200).json({
                count: review.length,
                avgvalue: avg/review.length,
                reviews: review,
            })
        })
            .catch(err=>{
                res.status(500).json({
                    error: err
                });
            });
        
          });

router.delete('/:reviewId',SellerAuth,(req, res, next) => {
    Review.remove({_id: req.params.reviewId}).exec()
    .then(result=>{
        res.status(200).json({
            message: "Review Deleted",
            
        })
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    });
    });

module.exports = router;