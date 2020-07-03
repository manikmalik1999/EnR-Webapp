import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import SignUp from "views/LoginPage/Signup.js"
import evef from "views/LoginPage/EmailVerification.js"
import resetpass from "views/LoginPage/ResetPassword.js"
import forgotpass from "views/LoginPage/ForgotPass.js"
import searchpage from "views/ProductPage/SearchDisplay.js"
import productDisplay from "views/ProductPage/SingleProduct.js"
import CategoryDisplay from "views/ProductPage/CategoryDisplay.js"
import CartDisplay from "views/Cart-Order/cart-page.js"
import OrderDisplay from "views/Cart-Order/order-page.js"
import SellerLogin from "views/SellerJourney/sellerLogin"
import SellerSignup from "views/SellerJourney/SellerSignup"
import sellerLanding from "views/SellerJourney/sellerLanding"

var hist = createBrowserHistory();
//:searchquery
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/landing-page" component={Components} />
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/Evef/:token" component={evef} />
      <Route path="/resetpass/:token" component={resetpass} />
      <Route path="/forgotpass" component={forgotpass} />
      <Route path="/search/:searchquery" component={searchpage} />
      <Route path="/categories/:category/:index" component={CategoryDisplay} />  
      <Route path="/display/:productID" component={productDisplay} /> 
      <Route path="/cart-page" component={CartDisplay} /> 
      <Route path="/order-page" component={OrderDisplay} />
      <Route path="/seller-login" component={SellerLogin} />
      <Route path="/seller-signup" component={SellerSignup} />
      
      <Route path="/seller-landing/:ID" component={sellerLanding} />
   
      <Route path="/" component={LandingPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
