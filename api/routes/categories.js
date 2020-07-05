const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Categories = require("../models/categories");
const multer = require('multer');
const checkAuthSellers = require("../Middleware/check-auth-sellers");

router.get('/', (req, res, next) => {
    Categories.find()
    .exec()
    .then(docs =>{
        res.status(200).json({
            count: docs.length,
            categories: docs
        });
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    });
  });
  
  router.post('/',checkAuthSellers, (req, res, next) => {
    console.log(req.body);
    const {email}= req.userData
    if(email!== "testadmin@gmail.com"){
        res.status(401).json({message: "You are not authorized"});
        return;
    }
    Categories.find({category: req.body.category})
    .exec()
    .then((result)=>{
        if(result.length>=1){
            res.status(401).json({message: "Category already exists"})
            return;
        }

        const category = new Categories({
            _id: mongoose.Types.ObjectId(),
            category: req.body.category
            })
        category.save()
        .then(result =>{
            console.log(result);
            res.status(201).json({
                message:"Category Added",
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
      });
      
      router.delete('/:categoryId',checkAuthSellers, (req, res, next) => {
        Categories.remove({_id: req.params.categoryId}).exec()
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