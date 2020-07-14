import React, { useState, useEffect } from "react";
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
//import ProductSection from "./Sections/ProductSection.js";
import NavBar from "components/Header/Navbar"
// import TeamSection from "./Sections/TeamSection.js";
// import WorkSection from "./Sections/WorkSection.js";
//import Parallax from "components/Parallax/Parallax.js";
//import parallaxStyle from "assets/jss/material-kit-react/components/parallaxStyle.js";
import { MyCarousel, Caro, Mul, Spec } from "./Sections/CardCarousel";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import elec from 'assets/img/Electronics.jpg';
import fashion from 'assets/img/fashion.jpg';
import sports from 'assets/img/sports.png';
import ent from 'assets/img/Entertainment.jpg';
import strip from 'assets/img/strip.webp';
import suit from 'assets/img/suit.png';
import chair from 'assets/img/chairs.jpg';
import fri from 'assets/img/fridge.jpg';
import tt from 'assets/img/turntable.jpg';
import tele from 'assets/img/tele.jpg';
import { Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import CardHeader from '@material-ui/core/CardHeader';
import CardBody from "components/Card/CardBody.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);
//const usStyles = makeStyles(parallaxStyle)
const usStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1200,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function LandingPage(props) {
  const classes = useStyles();
  const classe = usStyles();
  //const clas = usStyles();
  const { ...rest } = props;
  const [shad1, setShad1] = useState(0);
  const onMouseOver1 = () => {
    console.log('yup');
    setShad1(3);
  }
  const onMouseOut1 = () => setShad1(0);
  const [shad2, setShad2] = useState(0);
  const onMouseOver2 = () => {
    console.log('yup');
    setShad2(3);
  }
  const onMouseOut2 = () => setShad2(0);
  const [shad3, setShad3] = useState(0);
  const onMouseOver3 = () => {
    console.log('yup');
    setShad3(3);
  }
  const onMouseOut3 = () => setShad3(0);
  const [shad4, setShad4] = useState(0);
  const onMouseOver4 = () => {
    console.log('yup');
    setShad4(3);
  }
  const onMouseOut4 = () => setShad4(0);
  const [shad5, setShad5] = useState(0);
  const onMouseOver5 = () => {
    console.log('yup');
    setShad5(3);
  }
  const onMouseOut5 = () => setShad5(0);
  return (
    <div>
      <NavBar />
      <div style={{ marginTop: "10vh" }}>
        <Categories />
        <Paper square>

          <Caro /><br />
          <GridContainer>
            <GridItem xs={12} style={{ textAlign: "center", marginBottom: "3px" }}>
              <CardBody>
                <h1><b>Most Trending Categories</b></h1>
              </CardBody>
            </GridItem>
            <GridItem xs={6} md={3}>

              <Link to="/categories/electronics/6">
                <CardActionArea>
                  <img src={elec} alt="image" className={classes.media} style={{ width: "100%", height: "35vh" }} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: "center" }}>
                      Electronics
          </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>

            </GridItem>
            <GridItem xs={6} md={3}>
              <Link to="/categories/fashion/2">
                <CardActionArea>
                  <img src={fashion} alt="image" className={classes.media} style={{ width: "100%", height: "35vh" }} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: "center" }}>
                      Fashion
          </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </GridItem>
            <GridItem xs={6} md={3}>
              <Link to="/categories/entertainment/1">
                <CardActionArea>
                  <img src={ent} alt="image" className={classes.media} style={{ width: "100%", height: "35vh" }} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: "center" }}>
                      Entertainment
          </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </GridItem>
            <GridItem xs={6} md={3}>
              <Link to="/categories/sports/0">
                <CardActionArea>
                  <img src={sports} alt="image" className={classes.media} style={{ width: "100%", height: "35vh" }} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: "center" }}>
                      Sports
          </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={8}>
              <Spec />
            </GridItem>
            <GridItem xs={4}>
              <MyCarousel />
            </GridItem>
          </GridContainer><br />
          <div >
            <img src={strip} alt="offer" style={{ width: "100%", marginTop: "3px" }} />
          </div>
          <GridContainer style={{ margin: "15px", backgroundColor: "#faf7f7" }}>
            <GridItem xs={12} style={{ textAlign: "center", marginBottom: "3px" }}>
              <CardBody>
                <h1><b>Featured Items</b></h1>
              </CardBody>
            </GridItem>
            <GridItem xs={6}>
              <Card className={classe.root} onMouseOver={onMouseOver1}
                onMouseOut={onMouseOut1}
                style={{ boxShadow: `${shad1 * 0.05}px 0px ${shad1}px ${shad1}px #888888` }}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classe.avatar}>
                      T
          </Avatar>
                  }
                  title="Tuxedos and suits"
                  subheader="September 14, 2016"
                />
                <CardMedia
                  className={classe.media}
                  image={suit}
                  title="Tuxedos and suits"
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Formal wear for your moment—the best fit, the right style, delivered to you.Breathable, natural fabrics meet thoughtful construction so we can deliver on our promise to you.
        </Typography>
                </CardContent>
              </Card>
            </GridItem>
            <br />
            <GridItem xs={6}>
              <GridContainer>
                <GridItem xs={6}>
                  <Card className={classe.root} onMouseOver={onMouseOver2}
                    onMouseOut={onMouseOut2}
                    style={{ boxShadow: `${shad2 * 0.05}px 0px ${shad2}px ${shad2}px #888888` }}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classe.avatar}>
                          C
          </Avatar>
                      }
                      title=" YAMASORO COMPUTER CHAIR"
                      subheader="September 14, 2016"
                    />
                    <CardMedia
                      className={classe.media}
                      image={chair}
                      title="CHAIR"
                    />
                  </Card>
                </GridItem>
                <GridItem xs={6}>
                  <Card className={classe.root} onMouseOver={onMouseOver3}
                    onMouseOut={onMouseOut3}
                    style={{ boxShadow: `${shad3 * 0.05}px 0px ${shad3}px ${shad3}px #888888` }}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classe.avatar}>
                          F
          </Avatar>
                      }
                      title="Smart Fridge"
                      subheader="September 14, 2016"
                    />
                    <CardMedia
                      className={classe.media}
                      image={fri}
                      title="Smart Fridge"
                    />
                  </Card>
                </GridItem>
              </GridContainer>
              <GridContainer style={{ marginTop: "23px" }}>
                <GridItem xs={6}>
                  <Card className={classe.root} onMouseOver={onMouseOver4}
                    onMouseOut={onMouseOut4}
                    style={{ boxShadow: `${shad4 * 0.05}px 0px ${shad4}px ${shad4}px #888888` }}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classe.avatar}>
                          D
          </Avatar>
                      }
                      title="Direct-Drive Turntable"
                      subheader="September 14, 2016"
                    />
                    <CardMedia
                      className={classe.media}
                      image={tt}
                      title="Turntable"
                    />
                  </Card>
                </GridItem>
                <GridItem xs={6}>
                  <Card className={classe.root} onMouseOver={onMouseOver5}
                    onMouseOut={onMouseOut5}
                    style={{ boxShadow: `${shad5 * 0.05}px 0px ${shad5}px ${shad5}px #888888` }}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classe.avatar}>
                          T
          </Avatar>
                      }
                      title="Refractor Telescope Gskyer"
                      subheader="September 14, 2016"
                    />
                    <CardMedia
                      className={classe.media}
                      image={tele}
                      title="Telescope"
                    />
                  </Card>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
          <div style={{ marginTop: "12px" }}>
            <Mul />

          </div>
        </Paper>
      </div>

      <Footer />

    </div>
  );
}
