import React,{useState, useEffect} from 'react';
import axios from 'axios'; 
import StripeCheckout from 'react-stripe-checkout';

import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import NavBar from "components/Header/Navbar";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
// import Link from '@material-ui/core/Link';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import image from "assets/img/bg7.jpg";
import Footer from "components/Footer/Footer.js";
import Categories from "components/Header/CategoryBar.js";
// import styles from "assets/jss/material-kit-react/views/loginPage.js";
// nodejs library that concatenates classes
import classNames from "classnames";
import Typography from '@material-ui/core/Typography';
// @material-ui/core components

// @material-ui/icons

// core components
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import cimg from 'assets/img/empty_cart.png';

function Ecart () {
  const Home = () => {
    window.location.href = "/";
  }
  return (
    <div className="container-fluid" style={{paddingBottom:"40px"}}>
      <Typography color="textPrimary" style={{textAlign: "center"}} variant="h2" gutterBottom>Your Cart is empty</Typography>
  <img style={{width:"14vw", display:"block", marginLeft:"auto", marginRight:"auto"}} src={cimg} alt="Empty-Cart" />
  <Typography color="textSecondary" style={{textAlign: "center"}} variant="h5" gutterBottom>Add items to cart now!</Typography>
  <Button variant="contained" style={{display:"block", marginLeft:"auto", marginRight:"auto"}} size="large" color="secondary" onClick={Home}> Shop Now</Button>
  </div>
  );
}

const dashboardRoutes = [];

const useStyles = makeStyles(styles);
const Token = sessionStorage.getItem('TokenKey');
console.log(Token);
let count = 0;
let totalAmount =0;
export default function CartDisplay(props) {
  const classes = useStyles();
  const { ...rest } = props;
    const [products, setProducts] = useState([]);
    const [alert, setAlert]= useState([]);
    if(!Token){
      window.location.href="/login-page";
    }
    useEffect(() => {
        axios({
            method: 'get',
            url: "https://limitless-lowlands-36879.herokuapp.com/cart/",
            headers: {
                'Authorization': 'Bearer '+Token,
            } 
          })
      .then(res =>{
        if(res.data.status === 401){
          window.location.href="/login-page";
        }
        count = res.data.count;
        totalAmount = res.data.Price;
        setProducts(res.data.cart);
      })
      }, [])
    
      const makePayment = (token) => {
        {/*also provide product info  */}
        axios({
          method: 'post',
          url: "https://limitless-lowlands-36879.herokuapp.com/payment",
          data: {
              amount: totalAmount,
              token: token,
          }
        }).then(response => {
            console.log("RESPONSE", response);
            const {status} = response;
            console.log("Status ", status)
            products.forEach(element => {
              axios({
                method: 'post',
                url: "https://limitless-lowlands-36879.herokuapp.com/orders",
                headers: {
                  'Authorization': 'Bearer '+Token,
              } ,
                data: {
                    productId: element.productId,
                    quantity: element.quantity
                }
              }).then(res =>{
                console.log(res);
              })
            })
        })
         
    }

    const handleCartRemove=(e)=>{
      axios({
        method: 'delete',
        url: "https://limitless-lowlands-36879.herokuapp.com/cart/" + e,
        headers: {
            'Authorization': 'Bearer '+Token,
        } 
      })
  .then(res =>{
    if(res.data.status === 401){
      window.location.href="/login-page";
    }

    else if(res.data.status === 200){
        window.location.href ="/cart-page";
    }
    else{
      setAlert({
        status: res.data.status,
      })
    }
  })
    }

    const CartDeleteResponse=()=>{
         if(alert.status === 500){
          return(<SnackbarContent
            message={
              <span>
              Something Went Wrong
              </span>
            }
            close
            color="warning"
            icon="info_outline"
          />);
        }
        else{return null;}
    }

  return (
    <div>
      <NavBar/>

      <div style={{ marginTop:"10vh"}} className={classNames(classes.main, classes.mainRaised)}>
            {/* <Categories/> */}
        <h4 style={{color:"green", marginLeft:"1vw"}} ><b>My Cart</b> ({count})</h4>
        {count ? (
        <div className={classes.container}>
                <CartDeleteResponse/>
            {products.map(pro =>(
                <div key= {pro._id}  style={{margin:"2vh"}} >
                 <Grid className ="element"  container spacing={3} >
                    <Grid item xs={3}>
                        <img style={{height: "20vh", width: "auto"}} src= {"https://limitless-lowlands-36879.herokuapp.com/" + pro.image} />
                    </Grid>
                    <hr/>
                    <Grid item xs style={{textAlign:"top"}}>
                            <Link to={"/Display/" + pro.productId} target="_blank">
                                {pro.name}
                            </Link>
                             <p style={{color:"black"}}>Quantity: {pro.quantity}</p>
                            <Link style={{color:"#f44336"}}to={"/Display/" + pro.productId} target="_blank">
                                INR: {pro.price}
                            </Link>
                            <Button  onClick={()=> handleCartRemove(pro._id)} style={{display:"inline", marginLeft:"5vw"}} variant="contained" color="primary" >Remove from Cart</Button>
                    </Grid>
                    
                </Grid> 
                    <hr/>
                </div>
                ))}

                <StripeCheckout stripeKey="pk_test_51GydELJ4HkzSmV6vjb1f1fKaTWjlQnhDIMlzxlgnuSeyJgpeAfyr7v24Dm3MmZE2vKvim7Glf5s4nfrMOw3BPczz00KBrG9c8T" 
                token={makePayment} 
                name="Buy EnR" 
                shippingAddress 
                billingAddress
                 >
                  <Button variant="contained" color="secondary">Total Amount : {totalAmount}</Button>
                </StripeCheckout>

        </div>):<Ecart />}
      </div>
      <Footer/>
    </div>
  );
}
