import React,{useState, useEffect} from 'react';
import axios from 'axios'; 
// nodejs library that concatenates classes
import classNames from "classnames";
import Button from '@material-ui/core/Button';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Badge from 'components/Badge/Badge.js';
// core components
import Categories from "components/Header/CategoryBar.js"
import Footer from "components/Footer/Footer.js";
import Grid from '@material-ui/core/Grid';
import styles from "assets/jss/material-kit-react/views/landingPage.js";



import NavBar from "components/Header/Navbar"

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function SingleProd(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [product, setProduct] = useState([]);
  const ID = props.match.params.productID;
  useEffect(() => {
    axios.get('http://localhost:5000/products/'+ ID)
  .then(res =>{
    setProduct(res.data.product);
  })
  }, [])
  

  return (
    <div>
      <NavBar/>
      {[product].map(pro =>(
              
      <div style={{ marginTop:"12vh"}} className={classNames(classes.main, classes.mainRaised)}>
        <Categories/>
        <div><p></p></div>
           <div className={classes.container}>
                 <Grid className ="element"  container spacing={2} >
                    <Grid item xs={4}>
                        <img style={{height: "auto", width: "30vw"}} src= {"http://localhost:5000/" + pro.image} />
                        <div style={{display:"inline"}}>
                        <Button variant="contained" style={{backgroundColor:"#00e676", marginRight:"0.5vw",  fontSize:"1.5vw"}}>Cart</Button>
                        <Button variant="contained"  style={{backgroundColor:"#33eb91",  fontSize:"1.5vw"}}>Wishlist</Button>                          
                        </div>
                    </Grid>
                    <Grid item xs style={{color:"black"}} >
                       <h2 style={{fontSize:"3vw"}}>{pro.name}</h2>
                        <Badge color="primary">{pro.category}</Badge>
                       <h4 style={{fontSize:"1.5vw", fontWeight:"bold"}}>INR: {pro.price}</h4>
                        <h4 style={{fontSize:"1.5vw"}}>{pro.description}</h4>

                    </Grid>
                    
                </Grid>
             
       </div>
      </div>
      ))}
      <Footer/>
   
    </div>
  );
}
