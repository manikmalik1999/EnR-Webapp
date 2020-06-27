const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
// const checkAuth = require("../Middleware/check-auth")
// const Mentor = require("../models/mentor");
const stripe = require("stripe")("sk_test_51GydELJ4HkzSmV6vJanHUaArARtPqO4JlDUnM1QYogEzEohCVrXIT8LZPFK7heaPKELjZXCJRLV09UZ0p9UUEnal00F55bh2oy");
const {v4: uuidv4} = require("uuid")

router.post("/", (req, res)=>{

    const {product, token} = req.body;
    console.log("Product", product);
    console.log("Price", product.price);
    
    const idempotencyKey = uuidv4();
    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer =>{
        stripe.charges.create({ 
            amount: product.price * 100,
            currency: 'inr',
            customer: customer.id,
            receipt_email: token.email,
            description: 'purchase of' + product.name,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country,
                    line1: token.card.address_line1
                }
            }
        },{idempotencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err) )
})


module.exports = router;