import React,{useState, useEffect} from 'react';
import axios from 'axios'; 
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

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components

// @material-ui/icons

// core components
import styles from "assets/jss/material-kit-react/views/landingPage.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function CategoryDisplay(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const category = props.match.params.category;
  const index = parseInt(props.match.params.index, 10);
    const [products, setProducts] = useState([]);
 
    useEffect(() => {
        axios.get('https://limitless-lowlands-36879.herokuapp.com/products')
      .then(res =>{
        console.log(res);
        setProducts(res.data.products);
      })
      }, [])
    
    let filterpro = products.filter(
        (e)=>{
            return e.category.toUpperCase().includes(category.toUpperCase()) ;
        }
    )
  return (
    <div>
      <NavBar/>

      <div style={{ marginTop:"10vh"}} className={classNames(classes.main, classes.mainRaised)}>
            <Categories value= {index} />
        <h4 style={{color:"green", marginLeft:"1vw"}} ><b>{category}</b> </h4>
        <div className={classes.container}>
                
            {filterpro.map(pro =>(
                <div key= {pro._id}  style={{margin:"2vh"}} >
                 <Grid className ="element"  container spacing={3} >
                    <Grid item xs={3}>
                        <img style={{height: "20vh", width: "auto"}} src= {"https://limitless-lowlands-36879.herokuapp.com/" + pro.image} />
                    </Grid>
                    <hr/>
                    <Grid item xs style={{textAlign:"top"}}>
                            <Link to={"/Display/" + pro._id} target="_blank">
                                {pro.name}
                            </Link>
                        <p >{ pro.description}</p>
                        <Link style={{color:"#f44336"}}to={"/Display/" + pro._id} target="_blank">
                                INR: {pro.price}
                            </Link>

                    </Grid>
                    
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