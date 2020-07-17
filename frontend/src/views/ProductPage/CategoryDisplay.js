import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from "components/Header/Navbar";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
// import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
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
import Pagination from '@material-ui/lab/Pagination';
// nodejs library that concatenates classes
import classNames from "classnames";
import './overlay.css'
// @material-ui/core components

// @material-ui/icons

// core components
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import { Paper } from '@material-ui/core';
import Loading from '../Loading';

const dashboardRoutes = [];

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CategoryDisplay(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const category = props.match.params.category;
  const index = parseInt(props.match.params.index, 10);
  const [products, setProducts] = useState([]);
  const [proPerPage] = useState(12);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get('https://limitless-lowlands-36879.herokuapp.com/products')
      .then(res =>{
        console.log(res);
        setProducts(res.data.products);
        setLoading(false);
      })
    }, [])
    
  let filterpro = products.filter(
    (e)=>{
      return( e.category.toUpperCase().includes(category.toUpperCase()) && e.approved.toUpperCase().includes("TRUE"));
    }
  )
  // Get current posts
  const indLastPro = page*proPerPage;
  const indFirstPro = indLastPro-proPerPage;
  const currentPro = filterpro.slice(indFirstPro, indLastPro);
  //Change page
  const handleChange = (event, value) => {
    setPage(value);
    //console.log(filterpro.length);
  };
  return (
    <div>
      <NavBar/>
      {loading ? <Loading />:(
        <Paper>
          <div style={{ marginTop:"10vh"}} className={classNames(classes.main, classes.mainRaised)}>
            <Categories value= {index} />
            <h3 style={{color: "#512da8", textAlign:"center"}} ><b>{category.toUpperCase()}</b> </h3>
            <div className={classes.container}>
              <GridContainer style={{marginLeft:"10px",marginRight:"8px"}}>
                {currentPro.map(pro =>(
                  <GridItem xs={6} md={4} lg={3} style={{marginBottom:"5vh"}}>
                    <CardActionArea>
                      <CardMedia title={pro.name} >
                      <GridContainer justify="center" alignItems="center" style={{height:"43vh"}}>
                      <GridItem xs={12} style={{backgroundImage: `url(https://limitless-lowlands-36879.herokuapp.com/products/image/19e520d85461cfe9176eb7d9b232541b.jpg)`}}>
                        <img style={{maxHeight: "43vh", maxWidth: "100%", marginLeft:"auto", marginRight:"auto", display:"block"}} src= {"https://limitless-lowlands-36879.herokuapp.com/" + pro.image} />
                      <span class="button"><a href="#"> BUTTON </a></span>
                        </GridItem>
                        </GridContainer>
                      </CardMedia>
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="h3">                                                   
                          <Link to={"/Display/" + pro._id} target="_blank">
                            {pro.name}
                          </Link>                                               
                        </Typography>                                               
                        <Typography variant="body" color="textSecondary" component="h5">
                          <b>£: {pro.price}</b>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <Typography variant="body2" color="textSecondary" component="h5" style={{marginLeft:"10px"}}>
                      {pro.description}
                    </Typography>
                  </GridItem>
                ))}
              </GridContainer>
              <div className={classes.root}  style={{ display: "table",   /* Allow the centering to work */ margin: "0 auto"}}>
                <Pagination count={Math.ceil((filterpro.length)/proPerPage)} size="large" color="primary" page={page} onChange=     {handleChange} />
              </div>
            </div>
          </div>
          <div><br/></div>
        </Paper>
      )};
      <Footer/>
    </div>
  );
}
