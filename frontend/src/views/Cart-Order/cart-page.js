import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import TextField from '@material-ui/core/TextField';
// import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core"

import NavBar from "components/Header/Navbar";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
// import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
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
import Loading from '../Loading';


function Ecart() {
  const Home = () => {
    window.location.href = "/";
  }
  return (
    <div className="container-fluid" style={{ padding: "50px auto", margin: "40px auto" }}>
      <Grid container alignItems="center" style={{ minHeight: "445px" }} spacing={3}>
        <Grid item lg={1} />
        <Grid item lg={4}>
          <img style={{ width: "14vw", display: "block", marginLeft: "auto", marginRight: "auto" }} src={cimg} alt="Empty-Cart" />
        </Grid>
        <Grid item lg={7} style={{ textAlign: "center" }}>
          <Typography color="textPrimary" variant="h2" gutterBottom>Your Cart Looks Empty</Typography>
          <Typography color="textSecondary" style={{ marginLeft: "38px" }} variant="h5" gutterBottom>Add items to cart now!</Typography>
          <br />
          <Button variant="contained" style={{ display: "block", margin: "auto", width: "60%", backgroundColor: "#e8568e" }} size="large" color="secondary" onClick={Home}> Shop Now</Button>
        </Grid>
      </Grid>
    </div>
  );
}

const dashboardRoutes = [];

const useStyles = makeStyles(styles);
const Token = sessionStorage.getItem('TokenKey');
let count = 0;
let totalAmount = 0;
export default function CartDisplay(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState([]);
  const [promo, setPromo] = useState("");
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [final, setFinal] = useState(0);
  const [snack, setSnack] = useState({
    snack: {
      show: false,
      message: "",
      color: ""
    }
  })
  const snackbarClose = (event) => {
    setSnack({
      snack: {
        show: false,
        message: "",
        color: ""
      }
    })
  };
  // const [quantity, setQuantity]= useState(0);

  useEffect(() => {
    if (Token)
      axios({
        method: 'get',
        url: "https://limitless-lowlands-36879.herokuapp.com/cart/",
        headers: {
          'Authorization': 'Bearer ' + Token,
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.data.status === 401) {
            window.location.href = "/login-page";
          }
          count = res.data.count;
          setTotal(res.data.Price);
          setFinal(res.data.Price);
          // totalAmount = res.data.Price;
          setProducts(res.data.cart);
          // setQuantity(res.data.cart.quantity);
          setLoading(false);
          // setQuantity(res.data.cart.quantity);
        })
  }, [])
  const quantityChange = (e) => {
    if (e.target.value < 1) {
      setAlert({
        status: 500,
      });
    }
    else {
      console.log(e.target.value);
      console.log(e.target.id);
      axios({
        method: 'patch',
        url: "https://limitless-lowlands-36879.herokuapp.com/cart/" + e.target.id,
        headers: {
          'Authorization': 'Bearer ' + Token,
        },
        data: {
          quantity: e.target.value,
        }
      }).then(response => {
        if (response.status === 200)
          window.location.reload();
        else {
          setAlert({
            status: response.status,
          });
        }
      })
    }
  }
  const makePayment = (token) => {
    {/*also provide product info  */ }
    axios({
      method: 'post',
      url: "https://limitless-lowlands-36879.herokuapp.com/payment",
      data: {
        amount: total,
        token: token,
      }
    }).then(response => {
      console.log("RESPONSE", response);
      const { status } = response;
      console.log("Status ", status)
      products.forEach(element => {
        axios({
          method: 'post',
          url: "https://limitless-lowlands-36879.herokuapp.com/orders",
          headers: {
            'Authorization': 'Bearer ' + Token,
          },
          data: {
            productId: element.productId,
            quantity: element.quantity
          }
        }).then(res => {
          window.location.href = "/purchase-page";
          console.log(res);
        })
      })
    })

  }
  const promoHandler = (e) => {
    // console.log(e) ;
  }
  const submitFormHandler = (e) => {
    e.preventDefault();
    // console.log(promo);
    if (promo === "FIRST15") {
      setFinal(total * 0.85);
      setSnack({
        show: true,
        message: "Promo Code applied",
        color: "green"
      })
    } else if (promo === "JULY10") {
      setFinal(total * 0.90);
      setSnack({
        show: true,
        message: "Promo Code applied",
        color: "green"
      })
    } else {
      setSnack({
        show: true,
        message: "Please Enter a valid Promo Code",
        color: "red"
      })
    }
  }
  const handleCartRemove = (e) => {
    axios({
      method: 'delete',
      url: "https://limitless-lowlands-36879.herokuapp.com/cart/" + e,
      headers: {
        'Authorization': 'Bearer ' + Token,
      }
    })
      .then(res => {
        if (res.data.status === 401) {
          window.location.href = "/login-page";
        }

        else if (res.data.status === 200) {
          window.location.href = "/cart-page";
        }
        else {
          setAlert({
            status: res.data.status,
          })
        }
      })
  }

  const CartDeleteResponse = () => {
    if (alert.status === 500) {
      return (<SnackbarContent
        message={
          <span>
            Quantity Can not be less than 1
              </span>
        }
        close
        color="warning"
        icon="info_outline"
      />);
    }
    else { return null; }
  }
  console.log(total);
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snack.show}
        autoHideDuration={4000}
        onClose={snackbarClose}
        bodystyle={{ backgroundColor: 'teal', color: 'coral' }}
        message={<span id="message-id">{snack.message}</span>}

      >
        <SnackbarContent style={{
          backgroundColor: snack.color
        }}
          action={[
            <button key={"close"} onClick={snackbarClose} style={{ background: "none", border: "none", color: "white" }}>x</button>
          ]}
          message={<span id="client-snackbar">{snack.message}</span>}
        />
      </Snackbar>
      {Token ? (
        <div>
          <NavBar />
          {loading ? <div style={{ minHeight: "660px" }}><Loading /></div> : (
            <div style={{ marginTop: "10vh", padding: "24px", minHeight: "590px" }} className={classNames(classes.main, classes.mainRaised)}>
              {/* <Categories/> */}
              <h4 style={{ color: "green", marginLeft: "1vw" }} ><b>My Cart</b> ({count})</h4>
              {count ? (
                <div className={classes.container} style={{ minHeight: "270px" }}>
                  <CartDeleteResponse />
                  {products.map(pro => (
                    <div key={pro._id} style={{ margin: "2vh", marginTop: "20px", padding: "18px" }} >
                      <Grid container alignItems="center" justify="center" spacing={3} >
                        <Grid container item xs={3} style={{ margin: "auto", padding: "auto" }} justify="center">
                          <img style={{ height: "20vh", width: "auto" }} src={"https://limitless-lowlands-36879.herokuapp.com/" + pro.image} />
                        </Grid>
                        <hr />
                        <Grid item xs={8} style={{ textAlign: "top", paddingLeft: "32px" }}>
                          <Link to={"/Display/" + pro.productId} target="_blank" style={{ fontWeight: "400", fontSize: "18px" }}>
                            {pro.name}
                          </Link>
                          {/* <p style={{ color: "black" }}>Quantity: {pro.quantity}</p> */}
                          <TextField
                            label="Quantity"
                            id={pro._id}
                            type="number"
                            style={{ width: "25vw", display: "block", marginTop: "2vh" }}
                            variant="outlined"
                            value={pro.quantity}
                            onChange={quantityChange}
                          />
                          <Button onClick={() => handleCartRemove(pro._id)} style={{ backgroundColor: "#00897b", display: "inline", marginLeft: "30vw", marginTop: "-55px" }} variant="contained" color="primary" >Remove from Cart</Button>
                          <br />
                          <Link style={{ color: "#f44336", fontWeight: "400" }} to={"/Display/" + pro.productId} target="_blank">
                            £: {pro.price}
                          </Link>
                          {/* <br /> */}
                        </Grid>
                      </Grid>
                      <hr />
                    </div>
                  ))}
                  <StripeCheckout stripeKey="pk_test_51GydELJ4HkzSmV6vjb1f1fKaTWjlQnhDIMlzxlgnuSeyJgpeAfyr7v24Dm3MmZE2vKvim7Glf5s4nfrMOw3BPczz00KBrG9c8T"
                    token={makePayment}
                    name="Buy EnR"
                    shippingAddress
                    billingAddress
                  >
                    <Button variant="contained" style={{ backgroundColor: "#107869", color: "white", float: "right", marginTop: "18px" }}>Checkout : £ {Math.floor(final * 100) / 100}</Button>
                  </StripeCheckout>
                  {/* <br /> */}
                  <form>
                    <TextField
                      label="Promo Code"
                      id="promo"
                      type="text"
                      style={{ width: "auto", display: "block", marginTop: "2px", marginRight: "24px", float: "left" }}
                      value={promo}
                      onChange={e => {
                        setPromo(e.target.value);
                      }}
                    />
                    <Button variant="contained" style={{ backgroundColor: "#107869", color: "white", float: "left", marginTop: "18px" }} onClick={submitFormHandler}>Apply Promo Code</Button>
                  </form>
                </div>) : <Ecart />}
            </div>
          )}
        </div>
      ) : <NavBar stat={true} />
      }
      <Footer />
    </div>
  );
}
