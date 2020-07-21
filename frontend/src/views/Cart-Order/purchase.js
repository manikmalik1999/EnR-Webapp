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
      <div style={{ marginTop: "10vh", padding: "24px",paddingBottom:"42px",minHeight:"590px" }} className={classNames(classes.main, classes.mainRaised)}>
        <GridContainer justify="center"  style={{minHeight:"500px"}} alignItems="center" >
          <GridItem xs={12} lg={4} >
            <img src={shop} style={{ width: "14vw", display: "block", marginLeft: "auto", marginRight: "auto" }} alt="cart" />
          </GridItem>
          <GridItem xs={12} lg={8}>
            <Typography align="center" variant="h1" component="h2" color="secondary">
              Thank You!
            </Typography>
            <Typography variant="h4" align="center" gutterBottom>
              For shopping with us.
            </Typography>
            <Typography align="center" variant="h5" gutterBottom style={{ paddingBottom: "15px" }}>
              Your order was Placed Successfully.
            </Typography>
            <Info>
              <Typography variant="body1" gutterBottom style={{ fontSize: "1.3em",textAlign:"center" }} >
                View your Order <a style={{ color: "blue" }} href="/order-page">Here</a>.
              </Typography>
            </Info>
            <Button variant="contained" style={{ display: "block", margin: "auto", width: "25%", backgroundColor: "#e8568e", marginTop: "20px" }} size="large" color="secondary" onClick={Home}>Continue Shopping</Button>
          </GridItem>
        </GridContainer>

      </div>
      <Footer />
    </div >
  );
}