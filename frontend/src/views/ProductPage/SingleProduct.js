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
              <div className="slick-caption">
                <h4>
                  <LocationOn className="slick-icons" />Yellowstone
                  National Park, United States
                </h4>
              </div>
            </div>
            <div>
              <img
                src={image2}
                alt="Second slide"
                className="slick-image"
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

export default function SingleProd(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [product, setProduct] = useState([]);
  const ID = props.match.params.productID;
  const [cartResponse, setCartRes]= useState([]);
  const [quantity, setQuantity]= useState(0);
  useEffect(() => {
    axios.get('https://limitless-lowlands-36879.herokuapp.com/products/'+ ID)
  .then(res =>{
    setProduct(res.data.product);
  })
  }, [])

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
                <Select native value={quantity} onChange={handleChange}>
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
                </Select>                                  
                <h5 style={{fontSize:"1.4vw", fontWeight:"bold", color: "green"}}> Available Offers</h5> 
                <ul>
                  <li>This offer is so cool</li>
                </ul> 
                <form className={classes.root} noValidate autoComplete="off">
                  <TextField id="outlined-basic" label="Deliver to" variant="outlined" />
                </form>
              </Grid>                   
            </Grid>             
          </div>
        </div>
      ))}
      <Footer/>  
    </div>
  );
}
