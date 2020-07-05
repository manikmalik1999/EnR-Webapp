import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components

import Footer from "components/Footer/Footer.js";
import Categories from "components/Header/CategoryBar.js"

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import NavBar from "components/Header/Navbar"
// import TeamSection from "./Sections/TeamSection.js";
// import WorkSection from "./Sections/WorkSection.js";
//import Parallax from "components/Parallax/Parallax.js";
//import parallaxStyle from "assets/jss/material-kit-react/components/parallaxStyle.js";
import {MyCarousel, Caro, Mul,Spec} from "./Sections/CardCarousel";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Paper from '@material-ui/core/Paper';

const dashboardRoutes = [];

const useStyles = makeStyles(styles);
//const usStyles = makeStyles(parallaxStyle)

export default function LandingPage(props) {
  const classes = useStyles();
  //const clas = usStyles();
  const { ...rest } = props;
  return (
    <div>
     <NavBar/>
     <div style={{ marginTop:"10vh"}}>
     <Categories />
      {/* <Header
        color="info"
        routes={dashboardRoutes}
        brand="EnR E-COMMERCE"
        rightLinks={<HeaderLinks/>}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      /> 
       <Parallax filter image={require("assets/img/Landing-bg1.jpg")}>
        <div className={classes.container}>
          
              <h1 className={classes.title}>Your Shopping Starts With Us.</h1>
              <h4>
                EnR brings to you a state of the art solution for all your shopping needs
              </h4>
              <br /> 
              <MyCarousel />             
        </div>
      </Parallax>*/}
      
      {/*<div style={{ marginTop:"10vh"}} className={classNames(classes.main, classes.mainRaised)}>
      
        <div className={classes.container}>
          <ProductSection />
          
        </div>
      </div>*/}
      <br/>
      <Mul /><br/>
      
      <GridContainer spacing ={0} style={{marginLeft:"5px"}}>
        
      <GridItem xs={8}>     
      <Spec />
      </GridItem>
      <GridItem xs={4} style={{background: "white"}}>
        <MyCarousel />
      </GridItem>
      </GridContainer>
      
      <div style={{marginTop:"3px"}}>
      <Caro />
      </div>
      </div>
      <Footer />

    </div>
  );
}
