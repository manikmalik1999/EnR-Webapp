import React,{useState, useEffect} from 'react';
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const usStyles = makeStyles(modalStyle);
function Modal() {
  const [modal, setModal] = React.useState(false);
  const classes = usStyles();
  return (
    <div>
        <Button color="primary" round onClick={() => setModal(true)}>
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
        aria-describedby="modal-slide-description"
      >
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
        <DialogActions
          className={classes.modalFooter + " " + classes.modalFooterCenter}
        >
          <Button onClick={() => setModal(false)}>Never Mind</Button>
          <Button onClick={() => setModal(false)} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function SectionCarousel(){
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };
  return (
    <GridContainer>
      <GridItem xs={12}>
          <Carousel {...settings}>
            <div>
              <img
                src={image1}
                alt="First slide"
                className="slick-image"
                style={{float:"left" ,height: "auto", width: "23vw"}}
              />
            </div>
            <div>
              <img
                src={image2}
                alt="Second slide"
                className="slick-image"
                style={{marginTop: '50%'}}
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
                style={{marginTop: '50%'}}
              />
              <div className="slick-caption">
                <h4>
                  <LocationOn className="slick-icons" />Yellowstone
                  National Park, United States
                </h4>
              </div>
            </div>
          </Carousel>
      </GridItem>
    </GridContainer>
  );
}


const dashboardRoutes = [];

const useStyles = makeStyles(styles);
const Token = sessionStorage.getItem('TokenKey');
const uStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    marginLeft: '50%'
  },
}));

export default function SingleProd(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [product, setProduct] = useState([]);
  const ID = props.match.params.productID;
  const [cartResponse, setCartRes]= useState([]);
  const [quantity, setQuantity]= useState(0);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    axios.get('https://limitless-lowlands-36879.herokuapp.com/products/'+ ID)
  .then(res =>{
    setProduct(res.data.product);
  })
  }, [])

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleChange = (e) =>{
    setQuantity(e.target.value);
  }
  const QuantityResponse=()=>{
    if(quantity> product.quantity){
      return(<SnackbarContent
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
    else{
      return null;
    }
  }
  const HandleCart =(e)=>{
    if(quantity> product.quantity){
      alert("Set Appropriate Quantity")
      return;
    }
    axios({
      method: 'post',
      url: "https://limitless-lowlands-36879.herokuapp.com/cart/",
      headers: {
          'Authorization': 'Bearer '+Token,
      } ,
      data:{
        productId: ID,
        quantity: quantity,
      }

    }).then(res=>{
      console.log(res); 
      if(res.data.status === 201){
        setCartRes({
          message: res.data.message,
          color: "success"
        }) 
      }
      else if(res.data.status === 401){
        window.location.href = "/login-page";
      }
      else{
        setCartRes({
          message: res.data.message,
          color: "danger"
        }) 
      }
    
    })
  }
  const HandleCartResponse =() =>{
    if(cartResponse.message){
      return(<SnackbarContent
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
    else{
      return null;
    }
  }
  if (product.length){
    const clas = uStyles();
    console.log(product);
    return (
      <div className={clas.root}>
      <CircularProgress color="secondary" />
    </div>
  );}
  else 
  return (
    <div>
      <NavBar/>
      {[product].map(pro =>(             
        <div style={{ marginTop:"12vh"}} className={classNames(classes.main, classes.mainRaised)}>
          <Categories/>
          <div><p></p></div>       
          <div className={classes.container}>
            <QuantityResponse/>
            <HandleCartResponse />
            <Grid className ="element"  container spacing={1} >
              <Grid item xs={4} style={{float:"left"}}>
                <SectionCarousel />
                <div className="center" style={{display:"inline",   margin: "0",position: "relative", left: "3.5vw", right: "4vw"}}>
                  <Button onClick ={HandleCart} size="small" variant="contained" style={{backgroundColor:"#00e676", marginRight:"0.8vw",  fontSize:"1.4vw"}}>Cart</Button>
                  <Button variant="contained" size="small" style={{backgroundColor:"#33eb91",  fontSize:"1.4vw"}}>Wishlist</Button>                          
                </div>
              </Grid>
              <Grid item xs style={{color:"black", marginLeft:"1vw"}} >
                <h2 style={{fontSize:"3vw"}}>{pro.name}</h2>
                <Badge color="primary">{pro.category}</Badge>
                <Chip color="secondary" label="4.4" onClick ={console.log('take to reviews sction')} clickable size="small" icon={<StarRateIcon />} />
                <h4 style={{fontSize:"1.5vw", fontWeight:"bold"}}>INR: {pro.price}</h4>
                <h4 style={{fontSize:"1.5vw"}}>{pro.description}</h4>
                <InputLabel htmlFor="age-native-simple">Quantity</InputLabel>
                <Select native value={quantity} onChange={handleChange} open={open} onClose={handleClose} onOpen={handleOpen}>
                                    {/* inputProps={{
                                    //   name: 'age',
                                    //   id: 'age-native-simple',
                                     }}*/}             
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Select><br/><br/>                                 
                <h5 style={{fontSize:"1.4vw", fontWeight:"bold", color: "green"}}> Available Offers</h5> 
                <ul>
                  <li>This offer is so cool</li>
                </ul><br/> 
                <form className={classes.root} noValidate autoComplete="off">
                  <TextField id="outlined-basic" label="Deliver to" variant="outlined" />
                </form><br/>
                <Modal /><br/><br/>  
                Seller: &emsp; <Link>Take you to page with sellers info and ADD to CART opt</Link>       
              </Grid>                   
            </Grid>             
          </div>
        </div>
      ))}
      <Footer/>  
    </div>
  );
}
