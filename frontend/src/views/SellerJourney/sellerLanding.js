import React, { useState } from "react";
import axios from 'axios';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components


// @material-ui/icons

// core components

import Footer from "components/Footer/Footer.js";
import Categories from "components/Header/CategoryBar.js"

import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
// core components


import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import TextField from '@material-ui/core/TextField';

// Sections for this page
// import ProductSection from "./Sections/ProductSection.js";
import SellerNav from "components/Header/sellerNav"
import LinearProgress from '@material-ui/core/LinearProgress';

import DescriptionIcon from '@material-ui/icons/Description';
import CategoryIcon from '@material-ui/icons/Category';
import MoneyIcon from '@material-ui/icons/Money';
import AllInboxIcon from '@material-ui/icons/AllInbox';
// import TeamSection from "./Sections/TeamSection.js";
// import WorkSection from "./Sections/WorkSection.js";
import image from "assets/img/SellerLanding.jpg";
const dashboardRoutes = [];

const useStyles = makeStyles(styles);
const Token = sessionStorage.getItem('TokenSeller');
// console.log(ID);
// console.log(Token);
export default function LandingPage(props) {

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [proimage, setImage] = useState([]);
  const [response, setResponse] = useState(0);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading,setLoading] = useState(false) ;
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const HandleSubmitResponse = (e) => {

    if (response === 500) {
      return (<SnackbarContent
        message={
          <span>
            Something Went Wrong! Make sure you add 3 images, Don't leave anything blank and numbers should be logical
        </span>
        }
        close
        color="danger"
        icon="info_outline"
      />)
    }
    else if (response === 201) {
      return (<SnackbarContent
        message={
          <span>
            Product Added
          </span>
        }
        close
        color="success"
        icon="info_outline"
      />)
    }
    else
      return null;
  }

  const handleAdding = (e) => {
    setLoading(true) ;
    console.log(proimage);
    if(proimage.length !=3 || !name || !description || price<=0 || !category || quantity<1){
      setResponse(500);
    }
    else{
      Math.round(quantity);
      console.log("entering");
    var formData = new FormData()
    for (let i = 0; i < 3; i++) {
      formData.append('productImage', proimage[i]);
    }
    formData.append('name', name);
    formData.append('description', description);
    formData.append('quantity', quantity);
    formData.append('price', price.toFixed(2));
    formData.append('category', category);
    console.log(formData);
    axios({
      method: 'post',
      url: "http://localhost:5000/products",
      data: formData,
      headers: {
        'Authorization': 'Bearer ' + Token,
        'Content-Type': 'multipart/form-data'
      },
    }).then(res => {
      setLoading(false) ;
      setResponse(res.status);
      console.log(res.data.message);
      console.log(res.status);
    })
    .catch(err => {
      alert("add some data first") ;
      setLoading(false) ;
      console.log(err) ;
    })
  }
  }
  let loader = null;
  if (loading) {
    loader = <div style={{ width: "50%", margin: "auto" }}><LinearProgress color="primary" /></div>
  }
  return (
    <div>
      <SellerNav />
      <div
        style={{
          backgroundSize: "cover",
          backgroundColor:"#107869"
          // background: 'linear-gradient(rgba(0,0,0,0.05),rgba(0,0,0,0.1)) , url() no-repeat center center',
          // backgroundImage: "url(" + image + ")",
          // // backgroundColor:"#fafafa",
          // backgroundSize: "cover",
          // backgroundPosition: "top center"
        }}
      // className={classes.container}
      >
        <div style={{ paddingTop: "32px", zIndex: "200" }}>
          <HandleSubmitResponse />
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]} style={{ boxShadow: "2px 4px 12px #1A5653",background:"#B1D8B7" }}>
                <form className={classes.form}>
                  <CardHeader style={{ background: "#022D41", borderTopLeftRadius: "14px", borderBottomRightRadius: "14px" }} className={classes.cardHeader}>
                    <h4 style={{ color: "white" }}>Add Product</h4>
                  </CardHeader>
                  <p className={classes.divider}></p>
                  <CardBody>
                    <TextField
                      label="Name"
                      id="name"
                      type="text"
                      fullWidth
                      style={{ paddingBottom: '10%' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <PersonIcon style={{ color: "#107869" }} />
                          </InputAdornment>
                        )
                      }}

                      value={name}
                      onChange={e => { setName(e.target.value) }}
                    />

                    <TextField
                      label="Description"
                      id="description"
                      type="text"
                      fullWidth
                      style={{ paddingBottom: '10%' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <DescriptionIcon style={{ color: "#107869" }} />
                          </InputAdornment>
                        )
                      }}

                      value={description}
                      onChange={e => { setDescription(e.target.value) }}
                    />
                    <TextField
                      label="Category"
                      id="category"
                      type="text"
                      fullWidth
                      style={{ paddingBottom: '10%' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <CategoryIcon style={{ color: "#107869" }} />
                          </InputAdornment>
                        )
                      }}

                      value={category}
                      onChange={e => { setCategory(e.target.value) }}
                    />
                    <TextField
                      label="Price"
                      id="price"
                      type="number"
                      fullWidth
                      style={{ paddingBottom: '10%' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <MoneyIcon style={{ color: "#107869" }} />
                          </InputAdornment>
                        )
                      }}

                      value={price}
                      onChange={e => { setPrice(e.target.value) }}
                    />

                    <TextField
                      label="Quantity"
                      id="price"
                      type="number"
                      fullWidth
                      style={{ paddingBottom: '10%' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <AllInboxIcon style={{ color: "#107869" }} />
                          </InputAdornment>
                        )
                      }}

                      value={quantity}
                      onChange={e => { setQuantity(e.target.value) }}
                    />

                    <div className="form-group">
                      <input type="file" multiple onChange={e => { setImage(...proimage, e.target.files) }} />
                    </div>
                    {/* setImage(e.target.files) */}
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button variant="outlined" color="success" style={{background:"#107869"}} size="sm" onClick={handleAdding}>
                      Add
                    </Button>
                  </CardFooter>
                  <div style={{margin:"12px auto"}}>
                    {loader}
                  </div>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer color="#022D41" />
      </div>
    </div>
  );
}
