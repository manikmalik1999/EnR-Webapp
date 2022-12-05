import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import elliot from "../SellerSection/assets/img/elliot.jpg"

import Axios from 'axios';

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const sellerToken = localStorage.getItem('TokenSeller');

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  const [orders,setOrders] = useState({
    orders : null
  });

  useEffect(() => {
    // console.log(token) ;

    Axios.get("http://localhost:5000/orders", {
      headers: {
        "Authorization": "Bearer " + sellerToken
      }
    })
      .then(response => {
        setOrders({
          orders: response.data.orders
        })
      })
      .catch(err => {
        console.log(err);
      });

  }, []);

  return (
    <div>
      {/* <Header
        color="transparent"
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      /> */}
      {/* <Parallax small filter image={require("assets/img/profile-bg.jpg")} /> */}
      <div>
        <div>
          <div className={classes.container}>
            <GridContainer alignItems="center">
              <GridItem xs={12} sm={12} md={4}>
                <div className={classes.profile}>
                  <div style={{paddingTop:"64px"}}>
                    <img src={elliot} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name} style={{padding:"12px"}}>
                    <h3 className={classes.title}>{props.name}</h3>
                    <h6>Trusted Seller</h6>
                  </div>
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={8}>
                <div className={classes.description}>
                    <p>This is your Dashboard where you can Control all your product and orders related things.</p>
                    <p>We had tried to make all the things easy for you.</p>
                    <p>Any new update or information regarding anything will be shown here.</p>
                    <p>In case of any further query, you can Email at : manikmalik123abc@gmail.com</p>
                </div>
              </GridItem>
            </GridContainer>
            
            
            {/* <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Graph",
                      tabIcon: Camera,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={studio1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio2}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={studio5}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio4}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Revenue",
                      tabIcon: Palette,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work2}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work3}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work4}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work5}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Chart",
                      tabIcon: Favorite,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work4}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio3}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work2}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio1}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer> */}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
