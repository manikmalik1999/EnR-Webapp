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
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
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
        axios.get('http://localhost:5000/products')
      .then(res =>{
        console.log(res);
        setProducts(res.data.products);
      })
      }, [])
    
    let filterpro = products.filter(
        (e)=>{
            return( e.category.toUpperCase().includes(category.toUpperCase()) && e.approved.toUpperCase().includes("TRUE"));
        }
    )
  return (
    <div>
      <NavBar/>

      <div style={{ marginTop:"10vh"}} className={classNames(classes.main, classes.mainRaised)}>
            <Categories value= {index} />
        <h4 style={{color:"green", marginLeft:"1vw"}} ><b>{category}</b> </h4>
        <div className={classes.container}>
        <Grid className ="element"  container spacing={1} style={{display: "flex" }}>
            {filterpro.map(pro =>(
                                    <Grid item xs>
                                    {/* className={classes.root} */}
                                    {/* className={classes.media} */}
                                        <Card style={{maxWidth:"20vw", minWidth:"20vw", maxHeight:"45vh", minHeight:"45vh"}}> 
                                            <CardActionArea>
                                              <CardMedia
                                                title={pro.name}
                                                
                                              >
                                                  <img style={{height: "20vh", width: "auto", marginLeft:"auto", marginRight:"auto", display:"block"}} src= {"http://localhost:5000/" + pro.image} />
                                              </CardMedia>
                                              <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    
                                                    <Link to={"/Display/" + pro._id} target="_blank">
                                                        {pro.name}
                                                    </Link>
                                                
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                      {pro.description}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                  
                                                      <b>INR: {pro.price}</b>
                                                </Typography>
                                              </CardContent>
                                            </CardActionArea>
              
                                          </Card>
                                     
                                  </Grid>
                ))}
    </Grid>
        </div>
      </div>
 
      <Footer/>
   
    </div>
  );
}
