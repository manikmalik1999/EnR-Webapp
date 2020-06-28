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
// import TeamSection from "./Sections/TeamSection.js";
// import WorkSection from "./Sections/WorkSection.js";
import image from "assets/img/bg7.jpg";
const dashboardRoutes = [];

const useStyles = makeStyles(styles);
const Token = sessionStorage.getItem('TokenSeller');
const ID = sessionStorage.getItem('TokenSellerID');
console.log(ID);
export default function LandingPage(props) {

    const [name, setName]= useState("");
    const [category, setCategory]= useState("");
    const [proimage, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function() {
      setCardAnimation("");
    }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const HandleSubmitResponse=(e)=>{
return null;
  }
const handleAdding=(e)=>{
    const formData = new FormData()
    formData.append('productImage', proimage)
    let data ={
            name: name,
            description: description,
            quantity: quantity,
            price: price,
            category: category,
            sellerId: ID
    }
    formData.append('data', data);
    console.log(formData);
    console.log(price);
    axios({
        method: 'post',
        formData,
        url: "https://limitless-lowlands-36879.herokuapp.com/products",
        headers: {
            'Authorization': 'Bearer '+Token,
            'Content-Type': 'multipart/form-data'
          },
          formData
          
      }).then(res =>{
            alert(res.data.message);
           
        })
}
  return (
    <div>
     <SellerNav/>
     
     <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <HandleSubmitResponse/>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>ADD Product</h4>

                  </CardHeader>
                  <p className={classes.divider}></p>
                  <CardBody>
                  <TextField
                      label="Name"
                      id="name"
                      type="text"
                      fullWidth
                      style={{paddingBottom:'10%'}}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <PersonIcon style={{color:"purple"}} />
                          </InputAdornment>
                        )
                      }}
                    
                      value ={name}
                      onChange={e =>{setName(e.target.value)}}  
                    />

                <TextField
                      label="Description"
                      id="description"
                      type="text"
                      fullWidth
                      style={{paddingBottom:'10%'}}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <PersonIcon style={{color:"purple"}} />
                          </InputAdornment>
                        )
                      }}
                    
                      value ={description}
                      onChange={e =>{setDescription(e.target.value)}}  
                    />  
                <TextField
                      label="category"
                      id="category"
                      type="text"
                      fullWidth
                      style={{paddingBottom:'10%'}}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <PersonIcon style={{color:"purple"}} />
                          </InputAdornment>
                        )
                      }}
                    
                      value ={category}
                      onChange={e =>{setCategory(e.target.value)}}  
                    />  
                <TextField
                      label="Price"
                      id="price"
                      type="number"
                      fullWidth
                      style={{paddingBottom:'10%'}}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <PersonIcon style={{color:"purple"}} />
                          </InputAdornment>
                        )
                      }}
                    
                      value ={price}
                      onChange={e =>{setPrice(e.target.value)}}  
                    />  
                    
                    <TextField
                      label="Quantity"
                      id="price"
                      type="number"
                      fullWidth
                      style={{paddingBottom:'10%'}}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <PersonIcon style={{color:"purple"}} />
                          </InputAdornment>
                        )
                      }}
                    
                      value ={quantity}
                      onChange={e =>{setQuantity(e.target.value)}}  
                    />  

                     <div className="form-group">
                            <input type="file" onChange={e=>{setImage(e.target.files[0])}} />
                    </div>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" onClick={handleAdding}>
                      Add
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
      

    </div>
  );
}
