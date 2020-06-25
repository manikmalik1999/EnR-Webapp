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
//import Home from './components/components-cart/Home'
import Cart from 'views/CartPage/Cart'
import Stripe from 'views/PaymentsPage/Stripe'
//import { Provider } from 'react-redux';
//import { createStore, applyMiddleware } from 'redux';
//import thunk from 'redux-thunk';

var hist = createBrowserHistory();
//const k = createStore(DataFetching);
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
      <Route path="/cart" component={Cart}/>
      <Route path="/stripe" component={Stripe}/>
      <Route path="/" component={LandingPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
