import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from "components/Header/Navbar";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import image from "assets/img/bg7.jpg";
import Footer from "components/Footer/Footer.js";
import Categories from "components/Header/CategoryBar.js"
// import styles from "assets/jss/material-kit-react/views/loginPage.js";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components

// @material-ui/icons

// core components
import styles from "assets/jss/material-kit-react/views/landingPage.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function SearchDisplay(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const search = props.match.params.searchquery;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://limitless-lowlands-36879.herokuapp.com/products')
      .then(res => {
        console.log(res);
        setProducts(res.data.products);
      })
  }, [])

  let filterpro = products.filter(
    (e) => {
      return (e.name.toUpperCase().includes(search.toUpperCase()) && e.approved.toUpperCase().includes("TRUE"));
    }
  )
  return (
    <div>
      <NavBar value={search} />

      <div style={{ marginTop: "10vh" }} className={classNames(classes.main, classes.mainRaised)}>
        <Categories />
        <h4 style={{ color: "green", marginLeft: "1vw" }} >Search Results for "{search}"</h4>
        <Container >
          <Grid className="element" container spacing={1} style={{ display: "flex" }}>
            {filterpro.map(pro => (
              <div key={pro._id} style={{ margin: "2vh" }}>

                <Grid item xs>
                  {/* className={classes.root} */}
                  {/* className={classes.media} */}
                  <Card style={{ maxWidth: "25vw", minWidth: "15vw" }}>
                    <CardActionArea>
                      <CardMedia
                        title={pro.name}
                      >
                        {/* "https://limitless-lowlands-36879.herokuapp.com/products/image/" + pro.image */}
                        <img style={{ height: "20vh", width: "auto", marginLeft: "auto", marginRight: "auto", display: "block" }} src={"https://limitless-lowlands-36879.herokuapp.com/" + pro.image} />
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
                {/* <hr/>
                    <Grid item xs style={{textAlign:"top"}}>
                            <Link to={"/Display/" + pro._id} target="_blank">
                                {pro.name}
                            </Link>
                        <p style={{color: "black"}}>{ pro.description}</p>
                        <Link style={{color:"#f44336"}}to={"/Display/" + pro._id} target="_blank">
                                INR: {pro.price}
                            </Link>

                    </Grid> */}



              </div>
            ))}
          </Grid>
        </Container>
      </div>

      <Footer />

    </div>
  );
}

















// import React,{useState, useEffect} from 'react';
// import axios from 'axios'; 
// import NavBar from "components/Header/Navbar";
// import Grid from '@material-ui/core/Grid';
// import Container from '@material-ui/core/Container';
// import { makeStyles } from "@material-ui/core/styles";
// // import Link from '@material-ui/core/Link';
// import {Link} from 'react-router-dom';
// import Button from '@material-ui/core/Button';
// import image from "assets/img/bg7.jpg";
// import Footer from "components/Footer/Footer.js";
// // import styles from "assets/jss/material-kit-react/views/loginPage.js";

// // const useStyles = makeStyles(styles);

// export default function SearchDisplay(props){

//     const search = props.match.params.searchquery;
//     const [products, setProducts] = useState([]);
//     // const classes = useStyles();

//     useEffect(() => {
//         axios.get('https://limitless-lowlands-36879.herokuapp.com/products')
//       .then(res =>{
//         console.log(res);
//         setProducts(res.data.products);
//       })
//       }, [])

//     let filterpro = products.filter(
//         (e)=>{
//             return e.name.toUpperCase().includes(search.toUpperCase()) ;
//         }
//     )

//     return(
//         <>
//         <div
//         style={{
//         background:"white",
//         display:"block",
//         width: "100%",
//         height: "100%",
//         zIndex: 1,
//         }}
//       >

//         <div>
//             <NavBar value={search}/>
//        </div>
//        <Container style={{flexGrow: 1, position:"relative", marginTop:"9.5vh",marginLeft:"9.5vh",marginRight:"9.5vh", zIndex: 12, background:"white", borderRadius:"1vw"}}>

//         <h4>Search Results for "{search}"</h4>
//             {filterpro.map(pro =>(
//                 <div key= {pro._id}  style={{margin:"2vh"}} >

//                 <Grid className ="element"  container spacing={3} >
//                     <Grid item xs={3}>
//                         <img style={{height: "20vh", width: "auto"}} src= {"https://limitless-lowlands-36879.herokuapp.com/" + pro.image} />
//                     </Grid>
//                     <hr/>
//                     <Grid item xs style={{textAlign:"top"}}>
//                             <Link to={"/Display/" + pro._id}>
//                                 {pro.name}
//                             </Link>
//                         <p >{ pro.description}</p>
//                         <Link style={{color:"#f44336"}}to={"/Display/" + pro._id}>
//                                 INR: {pro.price}
//                             </Link>

//                     </Grid>

//                 </Grid>
//                     <hr/>
//                 </div>
//                 ))}

//         </Container>
//         <div style={{position: "absolute", bottom: 0}}>
//         <Footer/>
//         </div>

//         </div>
//         </>
//     )
// }