import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from "components/Header/Navbar";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
// import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
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
import './overlay.css';
//import styles from "assets/jss/material-kit-react/views/landingPage.js";
import { Paper } from '@material-ui/core';
import Loading from '../Loading';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Chip from '@material-ui/core/Chip';
import StarRateIcon from '@material-ui/icons/StarRate';

const dashboardRoutes = [];

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Token = localStorage.getItem('TokenKey');
export default function CategoryDisplay(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const category = props.match.params.category;
  const index = parseInt(props.match.params.index, 10);
  const [products, setProducts] = useState([]);
  const [proPerPage] = useState(12);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = useState(true);
  const [cartResponse, setCartRes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
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

  const HandleWhishlist =(id)=>{
    axios({
      method: 'post',
      url: "http://localhost:5000/wishlist/",
      headers: {
        'Authorization': 'Bearer ' + Token,
      },
      data: {
        productId: id,
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
      <NavBar/>
      {loading ? <Loading />:(
        <Paper>
          <div style={{ marginTop:"10vh"}} className={classNames(classes.main, classes.mainRaised)}>
            <Categories value= {index} />
            <h3 style={{color: "#512da8", textAlign:"center"}} ><b>{category.toUpperCase()}</b> </h3>
            <div className={classes.container}>
            <HandleCartResponse />
              <GridContainer style={{marginLeft:"10px",marginRight:"8px"}}>
                {currentPro.map(pro =>(
                  <GridItem xs={6} md={4} lg={3} style={{marginBottom:"5vh"}}>
                    <CardActionArea>
                      <CardMedia title={pro.name} >
                      <GridContainer  justify="center" alignItems="center" style={{height:"43vh"}}>
                        {pro.quantity?
                          (<GridItem className="container" xs={12}>
                            <img className="image" style={{maxHeight: "43vh", maxWidth: "100%", marginLeft:"auto", marginRight:"auto", display:"block"}} src= {"http://localhost:5000/" + pro.image} />
                            <div className="middle">
                              <IconButton size="large" color="secondary" aria-label="add to wishlist" onClick={() =>HandleWhishlist(pro._id)}>
                                <FavoriteIcon fontSize="large"/>
                              </IconButton>
                            </div>
                          </GridItem>) :(
                            <GridItem className="container" xs={12}>
                            <img style={{maxHeight: "43vh", maxWidth: "100%", marginLeft:"auto", marginRight:"auto", display:"block", opacity:".6"}} src= {"http://localhost:5000/" + pro.image} />
                            <div className="midd">
                              Out of Stock
                            </div>
                            </GridItem>
                          )}
                        </GridContainer>
                      </CardMedia>
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="h3"  align="center">                                                   
                          <Link to={"/Display/" + pro._id} target="_blank">
                            {pro.name}
                          </Link>                                               
                        </Typography>                                               
                        <Typography variant="body" style={{color:"green"}} component="h5" align="center">
                          <b>£: {pro.price}</b>
                          {pro.review ?
                      <Chip color="secondary" style={{ marginLeft: "46px" }} label={pro.review} clickable size="small" icon={<StarRateIcon />} />
                      : null}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <Typography variant="body2" color="textSecondary" component="h5" style={{marginLeft:"10px", fontSize:"1.1rem"}} align="center">
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
