const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../Middleware/check-auth")
const Product = require("../models/product");
const multer = require('multer');
const SellerAuth = require("../Middleware/check-auth-sellers")

const storage = multer.diskStorage({
  destination : function(req, file , cb){
    cb(null, './uploads');

  },
  filename : function (req, file, cb){
      cb(null, Date.now() + file.originalname)
  }
});

const fileFilter = (req, file, cb)=>{
if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);}
    else {cb(new Error('Only jpeg and png files allowed'), false);}
};
const upload = multer({storage: storage,
   limits:{fileSize: 1024*1024 *5},
   fileFilter: fileFilter
  });


router.get("/", (req, res, next) => {
  Product.find()
  .select('')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs
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


router.post("/", SellerAuth, upload.single('productImage'), (req, res, next) => {
  console.log(req.data);
  console.log(req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    quantity:  req.body.quantity,
    price: req.body.price,
    category: req.body.category,
    sellerId: req.body.sellerId,
    image: req.file.path,
    approved: req.body.approved
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
         

          request: {
            type: 'GET',
            url:  'https://limitless-lowlands-36879.herokuapp.com/products/'+ result._id
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
  .select('name price _id quantity category sellerId description image')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: 'GET',
            url: 'https://limitless-lowlands-36879.herokuapp.com/products'
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

router.patch("/:productId",SellerAuth, (req, res, next) => {
  const id = req.params.productId;
  console.log(id);
  // console.log(req);
  // const updateOps = {};
  // console.log("Entering");
  // for (const ops of req.body.Product) {
    
  //   updateOps[ops.propName] = ops.value;
  // }
  console.log(req.body.Product.description);
  Product.update({ _id: id }, { $set:{ 
    name: req.body.Product.name, 
    quantity: req.body.Product.quantity, 
    description: req.body.Product.description, 
    price: req.body.Product.price,
    category:  req.body.Product.category,
    sellerId:  req.body.Product.sellerId,
    image:  req.body.Product.image
  } })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'product updated',
        request: {
          type: 'GET',
          url: "https://limitless-lowlands-36879.herokuapp.com/products/"+ id,
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

router.delete("/:productId",SellerAuth, (req, res, next) => {
  
  const id = req.params.productId;
  console.log(id);
  Product.remove({ _id: id })
    .exec()
    .then(response=> {
      res.status(200).json({
        message: 'product deleted',
        request:{
          type: 'POST',
          url: 'https://limitless-lowlands-36879.herokuapp.com/products',
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
