const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../Middleware/check-auth")
const Product = require("../models/product");

router.get("/", (req, res, next) => {
  Product.find()
  .select('name price _id quantity description dataSheet')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc =>{
          return {
            name: doc.name,
            description: doc.description,
            _id: doc._id,
            quantity: doc.quantity,
            dataSheet: doc.dataSheet,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/products/'+ doc._id
            }
          }
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", checkAuth, (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    quantity:  req.body.quantity,
    dataSheet: req.body.dataSheet,

  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created Product",
        createdProduct: {
          name: result.name,
          description: result.description,
          _id: result._id,
          quantity: result.quantity,
          dataSheet: result.dataSheet,

          request: {
            type: 'GET',
            url:  'http://localhost:3000/products/'+ result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
  .select('name _id quantity description dataSheet')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/products'
          }
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

router.patch("/:productId",checkAuth, (req, res, next) => {
  const id = req.params.productId;
  console.log(id);
  // console.log(req);
  // const updateOps = {};
  // console.log("Entering");
  // for (const ops of req.body.Product) {
    
  //   updateOps[ops.propName] = ops.value;
  // }
  console.log(req.body.Product.description);
  Product.update({ _id: id }, { $set:{ name: req.body.Product.name, quantity: req.body.Product.quantity, description: req.body.Product.description, dataSheet: req.body.Product.dataSheet } })
    .exec()
    .then(result => {
      console.log(result);
      console.log("Enter");
      res.status(200).json({
        message: 'product updated',
        request: {
          type: 'GET',
          url: "http://localhost:3000/products/"+ id,
        }
      });
    })
    .catch(err => {
      console.log("Entering error")
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:productId",checkAuth, (req, res, next) => {
  
  const id = req.params.productId;
  console.log(id);
  Product.remove({ _id: id })
    .exec()
    .then(response=> {
      res.status(200).json({
        message: 'product deleted',
        request:{
          type: 'POST',
          url: 'http://localhost:3000/products',
          body: {name: 'String', quantity: 'Number'}
        }
      }
        );
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
