import React,{useState, useEffect} from 'react';
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
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Footer from "components/Footer/Footer.js";
import classNames from "classnames";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import ReviewDialog from './reviewdialog';

const dashboardRoutes = [];
let count =0;
const useStyles = makeStyles(styles);
const Token = sessionStorage.getItem('TokenKey');
console.log(Token);

export default function OrderDisplay(props) {
  const classes = useStyles();
  const { ...rest } = props;
    const [orders, setOrders] = useState([]);
    const [open, setOpen] = useState(false);
    const [review, setReview]= useState(2);
    const [comments, setComments]= useState("");
    if(!Token){
      window.location.href="/login-page";
    }
    useEffect(() => {
        axios({
            method: 'get',
            url: "https://limitless-lowlands-36879.herokuapp.com/orders/myOrder",
            headers: {
                'Authorization': 'Bearer '+Token,
            } 
          })
      .then(res =>{
        if(res.data.status === 401){
          window.location.href="/login-page";
        }
        count = res.data.count;
        console.log(res);
        setOrders(res.data.order);
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
    const handleSubmit= (e)=>{
      axios({
        method: 'post',
        url: "https://limitless-lowlands-36879.herokuapp.com/reviews",
        headers: {
            'Authorization': 'Bearer '+Token,
        },
        data: {
            value: review,
            comment: comments,
            productId: e
        }
      }).then(res=>{
        alert(res.data.message);
        setOpen(false);
      })
    }
    const handleSliderChange = (event, newValue)=>{
      setReview(newValue);
    }


  return (
    <div>
      <NavBar/>

      <div style={{ marginTop:"12vh"}} className={classNames(classes.main, classes.mainRaised)}>
            {/* <Categories/> */}
        <h4 style={{color:"green", marginLeft:"1vw"}} ><b>My Orders</b> ({count})</h4>
        <div className={classes.container}>
            {orders.map(pro =>(
                <div key= {pro._id}  style={{margin:"2vh"}} >
                 <Grid className ="element"  container spacing={3} >
                    <Grid item xs={3}>
                        <img style={{height: "20vh", width: "auto"}} src= {"https://limitless-lowlands-36879.herokuapp.com/" + pro.product.image} />
                    </Grid>
                    <hr/>
                    <Grid item xs style={{textAlign:"top"}}>
                            <Link to={"/Display/" + pro.product._id} target="_blank">
                                {pro.product.name}
                            </Link>
                             <p style={{color:"black"}}>Quantity: {pro.quantity}</p>
                            <Link style={{color:"#f44336"}}to={"/Display/" + pro.productId} target="_blank">
                            £: {pro.product.price}
                            </Link>
                          {/* <Button variant="contained" color="primary" style={{display:"inline", marginLeft:"20vw"}} onClick={handleOpen}>Add Review</Button> */}
                    </Grid>
                    <ReviewDialog id ={pro.product._id} token={Token}/>
                </Grid> 
                    <hr/>
                </div>
                ))}


        </div>
                  
      </div>
 
      <Footer/>
   
    </div>
  );
}


