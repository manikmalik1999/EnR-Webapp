import React, { useState, useEffect } from 'react';
import axios from 'axios';
// nodejs library that concatenates classes
import classNames from "classnames";
import Button from '@material-ui/core/Button';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
// @material-ui/icons
import Badge from 'components/Badge/Badge.js';
// core components
import Categories from "components/Header/CategoryBar.js"
import Footer from "components/Footer/Footer.js";
import Grid from '@material-ui/core/Grid';
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";


import NavBar from "components/Header/Navbar"

import Carousel from "react-slick";
// material-ui components
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
// import Rating from '@material-ui/core/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import Chip from '@material-ui/core/Chip';
import StarRateIcon from '@material-ui/icons/StarRate';
import TextField from '@material-ui/core/TextField';

import image1 from "assets/img/1592674003336hockey-Stick.jpg";
import image2 from "assets/img/bg2.jpg";
import image3 from "assets/img/bg3.jpg";

import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import modalStyle from "assets/jss/material-kit-react/modalStyle.js";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import { Paper } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const usStyles = makeStyles(modalStyle);

function Modal() {
  const [modal, setModal] = React.useState(false);
  const classes = usStyles();
  return (
    <div>
      <Button color="primary" round size="small" onClick={() => setModal(true)}>
        Product Details
        </Button>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={modal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModal(false)}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description">
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <IconButton
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setModal(false)}
          >
            <Close className={classes.modalClose} />
          </IconButton>
          <h4 className={classes.modalTitle}>Specifications</h4>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >
          <h5>Are you sure you want to do this?</h5>
        </DialogContent>
        <DialogActions className={classes.modalFooter + " " + classes.modalFooterCenter}>
          <Button onClick={() => setModal(false)}>Never Mind</Button>
          <Button onClick={() => setModal(false)} color="secondary">Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function SectionCarousel(props) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };
  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card style={{ boxShadow: "2px 3px 15px lightgrey ", width: "400px", height: "auto", maxHeigt: "450px" }}>
          <Carousel {...settings} style={{ padding: "12px" }}>
            <div>
              <img
                src={"http://localhost:5000/" + props.img}
                alt="First slide"
                className="slick-image"
                style={{ float: "left", height: "auto", width: "23vw" }}
              />
            </div>
            <div>
              <img
                src={"http://localhost:5000/" + props.img}
                alt="First slide"
                className="slick-image"
                style={{ float: "left", height: "auto", width: "23vw" }}
              />
            </div>
            {/* <div>
              <img
                src={image2}
                alt="Second slide"
                className="slick-image"
                style={{ marginTop: '50%' }}
              />
              <div className="slick-caption">
                <h4>
                  <LocationOn className="slick-icons" />Somewhere Beyond,
                  United States
                </h4>
              </div>
            </div>
            <div>
              <img
                src={image3}
                alt="Third slide"
                className="slick-image"
                style={{ marginTop: '50%' }}
              />
              <div className="slick-caption">
                <h4>
                  <LocationOn className="slick-icons" />Yellowstone
                  National Park, United States
                </h4>
              </div>
            </div> */}
          </Carousel>
        </Card>
      </GridItem>
    </GridContainer>
  );
}


const dashboardRoutes = [];

const useStyles = makeStyles(styles);
const Token = sessionStorage.getItem('TokenKey');
let AvgRev;
const uStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    marginLeft: '50%'
  },
}));

function Loading() {
  const clas = uStyles();
  const classes = useStyles();
  console.log('yes it is');
  return (
    <div style={{ marginTop: "12vh" }} className={classNames(clas.root)}>
      <CircularProgress color="primary" />
    </div>
  );
}

export default function SingleProd(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [product, setProduct] = useState([]);
  const ID = props.match.params.productID;
  const [cartResponse, setCartRes] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get('http://localhost:5000/products/' + ID)
      .then(res => {
        console.log(res.data.product);
        setProduct(res.data.product);
        setLoading(false);
      })
    axios.get('http://localhost:5000/reviews/' + ID)
      .then(res => {
        AvgRev = res.data.avgvalue;
        console.log(res.data);
        setReviews(res.data.reviews);
      })
  }, [])

  const handleClick = () => {
    console.info('You clicked the Chip.');
    window.location.href = "#Rate"
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    setQuantity(e.target.value);
  }
  
  const QuantityResponse = () => {
    if (quantity > product.quantity) {
      return (<SnackbarContent
        message={
          <span>
            Quantity is not available
          </span>
        }
        close
        color="danger"
        icon="info_outline"
      />);
    }
    else {
      return null;
    }
  }
  const HandleCart = (e) => {
    if (quantity > product.quantity) {
      alert("Set Appropriate Quantity")
      return;
    }
    axios({
      method: 'post',
      url: "http://localhost:5000/cart/",
      headers: {
        'Authorization': 'Bearer ' + Token,
      },
      data: {
        productId: ID,
        quantity: quantity,
      }

    }).then(res => {
      console.log(res);
      if (res.data.status === 201) {
        setCartRes({
          message: res.data.message,
          color: "success"
        })
      }
      else if (res.data.status === 401) {
        window.location.href = "/login-page";
      }
      else {
        setCartRes({
          message: res.data.message,
          color: "danger"
        })
      }

    })
  }
/////////////////////////////////////////////////////////////////////////////

  const HandleWhishlist =()=>{
    axios({
      method: 'post',
      url: "http://localhost:5000/wishlist/",
      headers: {
        'Authorization': 'Bearer ' + Token,
      },
      data: {
        productId: ID,
      }

    }).then(res => {
      console.log(res);
      if (res.data.status === 201) {
        setCartRes({
          message: res.data.message,
          color: "success"
        })
      }
      else if (res.data.status === 401) {
        window.location.href = "/login-page";
      }
      else {
        setCartRes({
          message: res.data.message,
          color: "danger"
        })
      }

    })
  }


  const HandleCartResponse = () => {
    if (cartResponse.message) {
      return (<SnackbarContent
        message={
          <span>
            {cartResponse.message}
          </span>
        }
        close
        color={cartResponse.color}
        icon="info_outline"
      />);
    }
    else {
      return null;
    }
  }


  return (
    <div>
      <NavBar />
      <div style={{ marginTop: "10vh", minHeight: "560px" }} className={classNames(classes.main, classes.mainRaised)}>
        {loading ? <div style={{ paddingTop: "170px" }}><Loading /></div> : (
          [product].map(pro => (
            <div>
              <Categories />
              {/* <div><p></p></div> */}
              <div className={classes.container}>
                <QuantityResponse />
                <HandleCartResponse />
                <Grid className="element" container spacing={1} alignContent="center" style={{ borderBottom: "1px solid lightgrey" }} >
                  <Grid item xs={4} style={{ float: "left" }}>
                    <SectionCarousel img={pro.image} />
                  </Grid>
                  <Grid item xs={2} ></Grid>
                  {/* <div className="center" style={{ display: "inline", margin: "0", position: "relative", left: "3.5vw", right: "4vw" }}>
                    <Button onClick={HandleCart} size="small" variant="contained" style={{ backgroundColor: "#00e676", marginRight: "0.8vw", fontSize: "1.4vw" }}>Cart</Button>
                    <Button variant="contained" size="small" style={{ backgroundColor: "#33eb91", fontSize: "1.4vw" }}>Wishlist</Button>
                  </div> */}
                  <Grid item xs style={{ color: "black", marginLeft: "1vw" }} >
                    <h2 style={{ fontSize: "2.2vw", fontWeight: "400" }}>{pro.name}</h2>
                    <hr></hr>
                    <h4 style={{ fontSize: "1.4vw" }}>{pro.description}</h4>

                    <Chip color="primary" label={pro.category.toUpperCase()} size="small  " />
                    {AvgRev ?
                      <Chip color="secondary" style={{ marginLeft: "16px" }} label={AvgRev} onClick={handleClick} clickable size="small" icon={<StarRateIcon />} />
                      : <Chip color="secondary" style={{ marginLeft: "16px" }} label={"Un-Rated"} onClick={handleClick} clickable size="small" icon={<StarRateIcon style={{ color: "yellow" }} />} />}

                    <br></br>
                    <h4 style={{ fontSize: "1.5vw", fontWeight: "bold" }}>£: {pro.price}</h4>
                    <span htmlFor="age-native-simple" style={{ marginRight: "16px" }}>Quantity</span>
                    <Select native value={quantity} style={{ textDecoration: "none" }} onChange={handleChange} open={open} onClose={handleClose} onOpen={handleOpen}>
                      {/* <option value={0}>0</option> */}
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </Select><br /><br />
                    <h5 style={{ fontSize: "1.4vw", fontWeight: "400", color: "green" }}> Available Offers</h5>
                    <ul>
                      <li style={{ fontSize: "1.1vw" }}>EMI @ £ 10 /month </li>
                      <li style={{ fontSize: "1.1vw" }}>Cash on delivery </li>
                      <li style={{ fontSize: "1.1vw" }}>One day Guaranteed Delivery </li>
                    </ul><br />

                    <Grid className="element" container spacing={1} style={{ marginBottom: "18px" }} >
                      <Grid item xs={6}>
                        <Button onClick={HandleCart} size="small" variant="contained" style={{ width: "100%", backgroundColor: "#512da8", color: "white", padding: "6px" }}>Add to Cart</Button>
                      </Grid>
                      <Grid xs></Grid>
                      <Grid item xs={6} >
                        <Button onClick={HandleWhishlist} variant="contained" size="small" style={{ width: "100%", backgroundColor: "#512da8", color: "white", padding: "6px" }}>Add to Wishlist</Button>
                      </Grid>
                    </Grid>
                    <hr />
                    <Grid className="element" container spacing={1} >
                      <Grid item xs={5} style={{ marginTop: "16px" }} >
                        <p style={{ fontSize: "1.2vw" }}>Seller: &emsp; <Link>{pro.sellerId.name}</Link></p>
                      </Grid>
                      <Grid xs></Grid>
                      <Grid item xs={5}>
                        <form className={classes.root} noValidate autoComplete="off">
                          <TextField className={classes.textField} margin="dense" id="outlined-basic" label="Deliver to" variant="outlined" />
                        </form><br />
                      </Grid>
                    </Grid>
                    <Modal /><br /><br />
                  </Grid>
                </Grid>
              </div>
              {AvgRev ?
                < div style={{ margin: "auto", width: "80%" }} id="Rate">
                  <Grid className="element" container spacing={1} style={{ marginBottom: "18px" }} >
                    <Grid item xs={12} >
                      <h3 style={{ color: "#512da8", fontWeight: "400" }}>Ratings & Reviews</h3>
                    </Grid>
                    <Grid item xs={10} style={{ margin: "auto" }}>
                      {reviews.map(rev => (
                        <Grid item xs={12}>
                          <Paper style={{ boxShadow:"2px 3px 15px lightgrey", padding: "8px",marginBottom:"12px" }}>
                            <div style={{ paddingLeft: "16px"}}>
                              <span style={{ color: "#531907", fontWeight: "300",fontSize:"22px"  }}>{rev.user.name}</span>
                              <br/>
                              <Button style={{marginRight:"18px",marginLeft:"8px"}} startIcon={<StarRateIcon style={{color:"#ffab00"}} />} disabled><span><b>{rev.value}</b>/5</span></Button> 
                              <span style={{ color: "#144A16",fontWeight:"400",fontSize:"16px" }}> - {rev.comments}</span>
                            </div>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>

                  </Grid>
                </div> : null}
            </div>
          )))}
      </div>
      <Footer />
    </div >
  );
}
