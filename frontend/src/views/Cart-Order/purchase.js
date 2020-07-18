import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Info from "components/Typography/Info.js";
import Primary from "components/Typography/Primary.js";
import NavBar from "components/Header/Navbar";
import classNames from "classnames";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from "components/Grid/GridItem.js";
import Footer from "components/Footer/Footer.js";
import Button from '@material-ui/core/Button';
import shop from 'assets/img/shop.png';

const useStyles = makeStyles(styles);

const Token = sessionStorage.getItem('TokenKey');
export default function Message() {
    const classes = useStyles();

    if (!Token) {
        window.location.href = "/login-page";
      }

    const Home = () => {
        window.location.href = "/";
      }
      
    return (
      <div className={classes.root}>
          <NavBar />
          <div style={{ marginTop: "10vh", padding: "24px" }} className={classNames(classes.main, classes.mainRaised)}>
            <GridContainer  justify="center" alignItems="center" >
                <GridItem xs={12}>
        <Typography align="center" variant="h1" component="h2" color="secondary">
          Thank You!
        </Typography>
        <Typography variant="h4" align="center" gutterBottom>
          For shopping with us.
        </Typography>
        <img src={shop} style={{ width: "14vw", display: "block", marginLeft: "auto", marginRight: "auto" }} alt="cart"/>
        <Typography align="center" variant="h5" gutterBottom style={{paddingBottom:"15px"}}>
          Your order was competed successfully.
        </Typography>
        <Info>
        <Typography variant="body1" gutterBottom style={{fontSize:"1.3em"}} >
        <a style={{color:"blue"}} href="/order-page">Click Here!</a> To review your orders. Please share your valuable feedback with us.
        </Typography>
        </Info>
        <Button variant="contained" style={{ display: "block",margin:"auto",width:"25%",backgroundColor: "#e8568e", marginTop:"20px"}} size="large" color="secondary" onClick={Home}>Continue Shopping</Button>
        </GridItem>
        </GridContainer>

        </div>
        <Footer />
      </div>
    );
  }