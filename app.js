const express = require("express");
const app = express();
// TODO: add a stripe key
// const stripe = require("stripe")("");
// const uuid = require("uuid/v4")

const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
var cors = require('cors');
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/users");
const StripeReq = require("./api/routes/Stripe");
const cartRoutes = require("./api/routes/cart");
const sellerRoutes = require("./api/routes/sellers");
const adminRoutes = require("./api/routes/admin");
// const projectRoutes = require("./api/routes/projects");
const mentorRoutes = require("./api/routes/mentors");
const categoryRoutes = require("./api/routes/categories")
const reviewRoutes = require("./api/routes/Review.js")
const wishlistRoutes = require("./api/routes/wishlist.js")

mongoose.connect('mongodb+srv://malikmanik:FEjpspbwr435pozs@cluster0.qzwhsjo.mongodb.net/?retryWrites=true&w=majority', 
{ useNewUrlParser: true,  
  useUnifiedTopology: true 
} ).then(()=> console.log("DB connection Established"))
.catch(err => console.log("DB connection error"+ err));

mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;


app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);
app.use("/payment", StripeReq);
// app.use("/projects", projectRoutes);
app.use("/ourmentors", mentorRoutes);
app.use("/cart", cartRoutes);
app.use("/sellers", sellerRoutes);
app.use("/admin", adminRoutes);
app.use("/categories", categoryRoutes);
app.use("/reviews", reviewRoutes);
app.use("/wishlist", wishlistRoutes);
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
