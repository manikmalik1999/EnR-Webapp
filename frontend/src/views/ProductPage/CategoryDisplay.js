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
// @material-ui/core components

// @material-ui/icons

// core components
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import { Paper } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const dashboardRoutes = [];

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const uStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    marginLeft: '50%'
  },
}));
function Loading (){
  const clas = uStyles();
  const classes = useStyles();
  console.log('yes it is');
  return (
    <div style={{ marginTop:"12vh"}} className={classNames(clas.root)}>
      <CircularProgress color="secondary" />
  </div>
);}

export default function CategoryDisplay(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const category = props.match.params.category;
  const index = parseInt(props.match.params.index, 10);
  const [products, setProducts] = useState([]);
  const [proPerPage] = useState(9);
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
      {loading ? <Loading /> :(
        <Paper>
          <div style={{ marginTop:"10vh"}} className={classNames(classes.main, classes.mainRaised)}>
            <Categories value= {index} />
            <h2 style={{color:"green", textAlign:"center"}} ><b>{category.toUpperCase()}</b> </h2>
            <div className={classes.container}>
              <GridContainer>
                {currentPro.map(pro =>(
                  <GridItem xs={6} md={4} lg={3} style={{marginBottom:"15px"}}>
                    <CardActionArea>
                      <CardMedia title={pro.name} >
                        <img style={{height: "43vh", maxWidth: "100%", marginLeft:"auto", marginRight:"auto", display:"block"}} src= {"https://limitless-lowlands-36879.herokuapp.com/" + pro.image} />
                      </CardMedia>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">                                                   
                          <Link to={"/Display/" + pro._id} target="_blank">
                            {pro.name}
                          </Link>                                               
                        </Typography>                                               
                        <Typography variant="body2" color="textSecondary" component="p">
                          <b>£: {pro.price}</b>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <Typography variant="body2" color="textSecondary" component="p">
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
