import React,{useState, useEffect} from 'react';
import axios from 'axios'; 
import StripeCheckout from 'react-stripe-checkout';

import NavBar from "components/Header/Navbar";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
// import Link from '@material-ui/core/Link';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import image from "assets/img/bg7.jpg";
import Footer from "components/Footer/Footer.js";
import Categories from "components/Header/CategoryBar.js"
// import styles from "assets/jss/material-kit-react/views/loginPage.js";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components

// @material-ui/icons

// core components
import styles from "assets/jss/material-kit-react/views/landingPage.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);
const Token = sessionStorage.getItem('TokenKey');
let count = 0;
export default function CartDisplay(props) {
  const classes = useStyles();
  const { ...rest } = props;
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        axios({
            method: 'get',
            url: "https://limitless-lowlands-36879.herokuapp.com/cart/",
            headers: {
                'Authorization': 'Bearer '+Token,
            } 
            // data: {
            //     email: email,
            //     password: password
            // }
          })
      .then(res =>{
        console.log(res);
        count = res.data.count;
        setProducts(res.data.cart);
      })
      }, [])
    
      const makePayment = token => {
        {/*also provide product info  */}
        axios({
          method: 'post',
          url: "https://limitless-lowlands-36879.herokuapp.com/payment",
          headers: {
              "Content-Type":"application/json"
          }, 
          data: {
              token: token,
              product: products
          }
        }).then(response => {
            console.log("RESPONSE", response);
            const {status} = response;
            console.log("Status ", status)
        })
        .catch ( error => console.log(error)); 
    }
    // let filterpro = products.filter(
    //     (e)=>{
    //         return e.name.toUpperCase().includes(search.toUpperCase()) ;
    //     }
    // )
  return (
    <div>
      <NavBar/>

      <div style={{ marginTop:"12vh"}} className={classNames(classes.main, classes.mainRaised)}>
            {/* <Categories/> */}
        <h4 style={{color:"green", marginLeft:"1vw"}} ><b>My Cart</b> ({count})</h4>
        <div className={classes.container}>
                
            {products.map(pro =>(
                <div key= {pro.productId}  style={{margin:"2vh"}} >
                 <Grid className ="element"  container spacing={3} >
                    <Grid item xs={3}>
                        <img style={{height: "20vh", width: "auto"}} src= {"https://limitless-lowlands-36879.herokuapp.com/" + pro.image} />
                    </Grid>
                    <hr/>
                    <Grid item xs style={{textAlign:"top"}}>
                            <Link to={"/Display/" + pro.productId} target="_blank">
                                {pro.name}
                            </Link>
                        <p style={{color: "black"}}>Quantity: {pro.quantity}</p>
                        <Link style={{color:"#f44336"}}to={"/Display/" + pro.productId} target="_blank">
                                INR: {pro.price}
                            </Link>

                    </Grid>
                    
                </Grid> 
                    <hr/>
                </div>
                ))}

                <StripeCheckout stripekey="pk_test_51GydELJ4HkzSmV6vjb1f1fKaTWjlQnhDIMlzxlgnuSeyJgpeAfyr7v24Dm3MmZE2vKvim7Glf5s4nfrMOw3BPczz00KBrG9c8T" 
                token={makePayment} 
                name="Buy EnR" 
                shippingAddress 
                billingAddress
                amount = {100*100}
                 >
                  <Button variant="contained" color="secondary">Proceed to checkout</Button>
                </StripeCheckout>

        </div>
      </div>
 
      <Footer/>
   
    </div>
  );
}
