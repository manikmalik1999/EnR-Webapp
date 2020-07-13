import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from '@material-ui/core/Slider';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Modal from '@material-ui/core/Modal';
import NavBar from "components/Header/Navbar";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import Footer from "components/Footer/Footer.js";
import cimg from 'assets/img/empty_cart.png';

// import styles from "assets/jss/material-kit-react/views/loginPage.js";
// nodejs library that concatenates classes
import classNames from "classnames";
import Loading from '../Loading';

// @material-ui/core components

// @material-ui/icons

// core components
import styles from "assets/jss/material-kit-react/views/landingPage.js";

function Ecart() {
  const Home = () => {
    window.location.href = "/";
  }
  return (
    <div className="container-fluid" style={{ padding: "50px auto", margin: "40px auto" }}>
      <Grid container spacing={3}>
        <Grid item lg={1} />
        <Grid item lg={4}>
          <img style={{ width: "14vw", display: "block", marginLeft: "auto", marginRight: "auto" }} src={cimg} alt="Empty-Cart" />
        </Grid>
        <Grid item lg={7} style={{ textAlign: "center" }}>
          <Typography color="textPrimary" variant="h2" gutterBottom>Your Orders Look Empty</Typography>
          <Typography color="textSecondary" style={{ marginLeft: "38px" }} variant="h5" gutterBottom>Place Order now!</Typography>
          <br />
          <Button variant="contained" style={{ display: "block", margin: "auto", width: "60%", backgroundColor: "#00897b" }} size="large" color="secondary" onClick={Home}> Shop Now</Button>
        </Grid>
      </Grid>
    </div>
  );
}

const dashboardRoutes = [];
let count = 0;
const useStyles = makeStyles(styles);
const Token = sessionStorage.getItem('TokenKey');

export default function OrderDisplay(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState(2);
  const [comments, setComments] = useState("");
  if (!Token) {
    window.location.href = "/login-page";
  }
  useEffect(() => {
    axios({
      method: 'get',
      url: "https://limitless-lowlands-36879.herokuapp.com/orders/myOrder",
      headers: {
        'Authorization': 'Bearer ' + Token,
      }
    })
      .then(res => {
        if (res.data.status === 401) {
          window.location.href = "/login-page";
        }
        setOrders(res.data.order);
        count = res.data.count;
        console.log(res);
        setLoading(false);
      })
  }, [])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function valuetext(value) {
    return `${review}`;
  }
  const handleSubmit = (e) => {
    axios({
      method: 'post',
      url: "https://limitless-lowlands-36879.herokuapp.com/reviews",
      headers: {
        'Authorization': 'Bearer ' + Token,
      },
      data: {
        value: review,
        comment: comments,
        productId: e
      }
    }).then(res => {
      alert(res.data.message);
      setOpen(false);
    })
  }
  const handleSliderChange = (event, newValue) => {
    setReview(newValue);
  }


  return (
    <div>
      <NavBar />
      {loading ? <Loading /> :
        <div style={{ marginTop: "10vh", padding: "24px" }} className={classNames(classes.main, classes.mainRaised)}>
          {/* <Categories/> */}
          <h4 style={{ color: "green", marginLeft: "1vw" }} ><b>My Orders</b> ({count})</h4>
          {count > 0 ? (<div className={classes.container}>
            {orders.map(pro => (
              <div key={pro._id} style={{ margin: "2vh" }} >
                <Grid className="element" container spacing={3} >
                  <Grid item xs={3}>
                    <img style={{ height: "20vh", width: "auto" }} src={"https://limitless-lowlands-36879.herokuapp.com/" + pro.product.image} />
                  </Grid>
                  <hr />
                  <Grid item xs style={{ textAlign: "top", paddingLeft: "32px" }}>
                    <Link to={"/Display/" + pro.product._id} target="_blank" style={{ fontWeight: "400", fontSize: "18px" }}>
                      {pro.product.name}
                    </Link>
                    <p style={{ color: "black" }}>Quantity: {pro.quantity}</p>
                    <Link style={{ color: "#f44336", fontWeight: "400" }} to={"/Display/" + pro.productId} target="_blank">
                      £: {pro.product.price}
                    </Link>
                    <br />
                    <Button variant="contained" color="primary" style={{ backgroundColor: "#00897b", display: "inline", marginLeft: "20vw" }} onClick={handleOpen}>Add Review</Button>
                  </Grid>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    <div style={{
                      position: 'absolute',
                      width: 400,
                      backgroundColor: "white",
                      border: '2px solid #000',
                      boxShadow: "2",
                      paddingTop: "2vh",
                      paddingLeft: "2vw",
                      paddingRight: "2vw",
                      paddingBottom: "2vh",
                      marginTop: "15vh",
                      marginLeft: "25vw",

                    }}>
                      <form>
                        <h2><b>{pro.product.name}</b></h2>
                        <Typography id="discrete-slider" gutterBottom>
                          Add Review
                                </Typography>
                        <Slider


                          value={review}
                          onChange={handleSliderChange}
                          getAriaValueText={valuetext}
                          aria-labelledby="discrete-slider"
                          valueLabelDisplay="on"
                          step={1}
                          marks
                          min={1}
                          max={5}
                        />
                        <TextField value={comments} id="standard-basic" label="Any Comments?" fullWidth onChange={(e) => { setComments(e.target.value) }} />
                        <Button onClick={() => { handleSubmit(pro.product._id) }} style={{ marginTop: "1vh", position: "block", marginLeft: "auto", marginRight: "auto" }} variant="contained" color="secondary">Submit</Button>
                      </form>
                    </div>
                  </Modal>
                </Grid>
                <hr />
              </div>
            ))}
          </div>) :
            <Ecart />}

        </div>
      }

      <Footer />

    </div>
  );
}
