const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../Middleware/check-auth")
const Product = require("../models/product");
const multer = require('multer');
const SellerAuth = require("../Middleware/check-auth-sellers")
let conn= mongoose.connection;
let {GridFsStorage} = require('multer-gridfs-storage');
let Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require('path');

// Grid.mongo = mongoose.mongo;
let gfs;
conn.once('open', ()=>{
   gfs = Grid(conn.db, mongoose.mongo);
   gfs.collection('uploads');
})
// Grid.mongo = mongoose.mongo;



// const storage = multer.diskStorage({
//   destination : function(req, file , cb){
//     cb(null, './uploads');

//   },
//   filename : function (req, file, cb){
//       cb(null, Date.now() + file.originalname)
//   }
// });
const storage = GridFsStorage({
  // gfs : gfs,
  url: "mongodb+srv://malikmanik:FEjpspbwr435pozs@cluster0.qzwhsjo.mongodb.net/?retryWrites=true&w=majority",
  options: { useUnifiedTopology: true },

  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
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


router.post("/", SellerAuth, upload.array('productImage',3), (req, res, next) => {
  // console.log(req.data);
  console.log(req.files);
  const{userId}= req.userData;
  console.log("iserrorheere")
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    quantity:  req.body.quantity,
    price: req.body.price,
    category: req.body.category,
    sellerId: userId,
    image: "products/image/"+ req.files[0].filename,
    image2: "products/image/"+ req.files[1].filename,
    image3: "products/image/"+ req.files[2].filename,
    approved: req.body.approved
  });
  console.log("is it here?")
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
          image: result.image,

          request: {
            type: 'GET',
            url:  'http://localhost:5000/products/'+ result._id
          } 
        }
      });
    })
    .catch(err => {
      console.log("where is it?")
      console.log(err);
      res.json({
        message: err
      }).status(500);
    });
});


router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
  .select('name price _id quantity category sellerId description image image2 image3 review')
  .populate('sellerId', 'name')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: 'GET',
            url: 'http://localhost:5000/products'
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



router.get("/image/:filename", (req, res, next )=>{
  gfs.files.findOne({filename: req.params.filename }, (err, file)=>{
    console.log(file);
    if(!file || file.length===0){
      return res.json({
        message:"No file exists"
      }).status(404);
    }
//check if image
if(file.contentType === 'image/jpeg' || file.contentType === 'image/png'){
  //read output to browser
const readstream = gfs.createReadStream(file.filename);
readstream.pipe(res);
}else{
  res.status(404).json({
    message: "Not an image"
  });
}

  })
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
  Product.updateOne({ _id: id }, { $set:{ 
    name: req.body.Product.name, 
    quantity: req.body.Product.quantity, 
    description: req.body.Product.description, 
    price: req.body.Product.price,
    category:  req.body.Product.category,
  } })
    .exec()
    .then(result => {
      console.log(result);
      res.json({
        message: 'product updated',
        request: {
          type: 'GET',
          url: "http://localhost:5000/products/"+ id,
        }
      }).status(200);
    })
    .catch(err => {
      console.log("Entering error")
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
//,SellerAuth
router.delete("/:productId",SellerAuth, (req, res, next) => {

  const id = req.params.productId;
  Product.findById(id)
  .exec()
  .then(product=>{
    console.log(product);
    let filename1= product.image.substring(15);
    let filename2= product.image2.substring(15);
    let filename3= product.image3.substring(15);
    console.log(filename1, " ", filename2, " ", filename3);
    gfs.remove({filename: filename1,  root: 'uploads'}, (err)=> {
      if (err) console.log('faliure');
     else console.log('success');
    });
    gfs.remove({filename: filename2,  root: 'uploads'}, (err)=> {
      if (err) console.log('faliure');
      else console.log('success');
    });
    gfs.remove({filename: filename3, root: 'uploads'}, (err)=> {
      if (err) console.log('faliure');
     else console.log('success');
    });
  }).catch(err=>{
    res.status(500).json({
      message:"Images not deleted"
    })
  });

  
  console.log(id);
  Product.deleteOne({ _id: id })
    .exec()
    .then(response=> {
      res.status(200).json({
        message: 'product deleted',
        request:{
          type: 'POST',
          url: 'http://localhost:5000/products',
          body: {name: 'String', quantity: 'Number'}
        }
      }
        );
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message:" something is wrong"
      });
    });
});




module.exports = router;
