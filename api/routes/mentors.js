const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../Middleware/check-auth")
const Mentor = require("../models/mentor");

router.get("/", (req, res, next) => {
  Mentor.find()
  .select('')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        mentors: docs.map(doc =>{
          return {
            _id: doc._id,
            name: doc.name,
            Comapany: doc.Company,
            Designation: doc.Designation,
            Specialization : doc.Specialization,
            request: {
              type: 'GET',
              url: 'http://tranquil-fortress-57962.herokuapp.com/mentors/'+ doc._id
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
  const mentor = new Mentor({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    Company: req.body.Company,
    Designation:  req.body.Designation,
    Specialization: req.body.Specialization,

  });
  mentor
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created Mentor Profile",
        createdProduct: {
          name: result.name,
          Company: result.Company,
          _id: result._id,
          Designation: result.Designation,
          Specialization: result.Specialization,

          request: {
            type: 'GET',
            url:  'http://tranquil-fortress-57962.herokuapp.com/mentors/'+ result._id
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

// router.get("/:productId", (req, res, next) => {
//   const id = req.params.productId;
//   Product.findById(id)
//   .select('name _id quantity description dataSheet')
//     .exec()
//     .then(doc => {
//       console.log("From database", doc);
//       if (doc) {
//         res.status(200).json({
//           product: doc,
//           request: {
//             type: 'GET',
//             url: 'http://localhost:3000/products'
//           }
//         });
        
//       } else {
//         res
//           .status(404)
//           .json({ message: "No valid entry found for provided ID" });
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// });

router.patch("/:mentorId",checkAuth, (req, res, next) => {
  const id = req.params.mentorId;
  console.log(id);
  // console.log(req);
  // const updateOps = {};
  // console.log("Entering");
  // for (const ops of req.body.Product) {
    
  //   updateOps[ops.propName] = ops.value;
  // }
  console.log(req.body.Mentor.name);
  Mentor.update({ _id: id }, { $set:{ name: req.body.Mentor.name, Company: req.body.Mentor.Company, Designation: req.body.Mentor.Designation, Specialization: req.body.Mentor.Specialization } })
    .exec()
    .then(result => {
      console.log(result);
      console.log("Enter");
      res.status(200).json({
        message: 'Mentor Info updated',
        request: {
          type: 'GET',
          url: "http://tranquil-fortress-57962.herokuapp.com/ourmentors/"+ id,
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

router.delete("/:mentorId",checkAuth, (req, res, next) => {
  
  const id = req.params.mentorId;
  console.log(id);
  Mentor.remove({ _id: id })
    .exec()
    .then( response => {
      res.status(200).json({
        message: 'Mentor deleted',
        request:{
          type: 'POST',
          url: 'http://tranquil-fortress-57962.herokuapp.com/mentors',
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
