import React, { useState } from "react";
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// import Alert from '@material-ui/lab/Alert';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import LockIcon from '@material-ui/icons/Lock';
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import TextField from '@material-ui/core/TextField';
import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/SignIn.jpeg";

const useStyles = makeStyles(styles);

export default function SignUp(props) {
  const [email , setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[googleavailable, setGoogav]= useState(true);
  const [loginFal , setLoginFal] = useState(false);
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  // const responseGooglesuccess =(response)=>{
  //     console.log(response);
  //     window.location.href = "/";
  // }
  const ResponseGoogle =(response)=>{
    if(googleavailable === false){

   return ( <SnackbarContent
    message={
      <span>
        Google Login Not available
      </span>
    }
    close
    color="danger"
    icon="info_outline"
  />);
    }
    else{return null}
}
  function handleSignup(e){
    console.log(email);
    axios({
        method: 'post',
        url: "https://limitless-lowlands-36879.herokuapp.com/users/login/",
        headers: {}, 
        data: {
            email: email,
            password: password
        }
      }).then(res =>{
                console.log(res);
                if((res.data.status)!= 401){
                const token = res.data.token;
                sessionStorage.setItem('TokenKey', token);
                window.location.href = "/";
               }
               else{
                setLoginFal(true);
               }
        })
}
const responseSuccessGoogle =(response)=>{
  axios({
    method: 'post',
    url: "https://limitless-lowlands-36879.herokuapp.com/users/google/login/",
    headers: {}, 
    data: {
        tokenId: response.tokenId
    }
  }).then(res=>{
    console.log(res)
  })
}
const HandleLoginFaliure=()=>{
  if(loginFal === true){
    return(<SnackbarContent
      message={
        <span>
         login faliure
        </span>
      }
      close
      color="danger"
      icon="info_outline"
    />);
  }
  else {
    return null;
  }
}

  return (
    <div>
      
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        
        <div className={classes.container}>
        <ResponseGoogle/><HandleLoginFaliure/>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Log In</h4>
                    <div className={classes.socialLine}>
                    <GoogleLogin
                          clientId="744225883265-ru7qj83bl7bqsfcarhbp6c6qqqo71e64.apps.googleusercontent.com"
                          buttonText="Login"
                          render={renderProps => (
                            <Button
                            justIcon
                            color="transparent"
                            onClick={renderProps.onClick}
                              >
                            <i className={"fab fa-google-plus-g"} />
                          </Button>
                          )}
                          onSuccess={responseSuccessGoogle}
                          onFailure={(e)=>{ 
                            setGoogav(false);
                            ResponseGoogle(1);
                          }}
                          cookiePolicy={'single_host_origin'}
                        />

                      {/* <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button> */}
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>

                    </div>
                  </CardHeader>
                  <p className={classes.divider}>Or Be Classical</p>
                  <CardBody>
                    <TextField
                      label="Email..."
                      id="email"
                      type="email"
                      fullWidth
                      style={{paddingBottom:'10%'}}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email  style={{color:"purple"}} />
                          </InputAdornment>
                        )
                      }}
                    
                      value ={email}
                      onChange={e =>{setEmail(e.target.value)}}  
                    />
                <TextField
                      label="Password"
                      id="pass"
                      type="password"
                      fullWidth
                      style={{paddingBottom:'10%'}}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <LockIcon style={{color:"purple"}}/>
                          </InputAdornment>
                        )
                      }}
                      value ={password}
                      onChange={e =>{setPassword(e.target.value)}}  
                    />
                    {/* <CustomInput
                      labelText="Email..."
                      id="email"
                      value ={email}
                      onChange={e =>{setEmail(e.target.value)}}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                   
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      value ={password}  
                      onChange={e =>{setPassword(e.target.value)}}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                         
                      }}

                    /> */}
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <div>
                    <Button simple color="primary" size="lg" onClick={handleSignup}>
                      Get started
                    </Button>
                    </div>
                  </CardFooter>
                  <CardFooter className={classes.cardFooter}>
                    <div>
                    <a href="/forgotpass">Forgot Password?</a> 
                    </div>
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
