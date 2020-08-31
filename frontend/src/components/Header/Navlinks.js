import React, { useState } from "react";
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// import Alert from '@material-ui/lab/Alert';

// @material-ui/icons
import Email from "@material-ui/icons/Email";

import LockIcon from '@material-ui/icons/Lock';
// core components

import Button from "components/CustomButtons/Button.js";

import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from '@material-ui/core/TextField';
import styles from "assets/jss/material-kit-react/views/loginPage.js";


import modalStyle from "assets/jss/material-kit-react/modalStyle.js";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from '@material-ui/icons/Person';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const usStyles = makeStyles(modalStyle);
const useStyles = makeStyles(styles);

export default function Signin(props) {
  const [modal, setModal] = React.useState(props.stat);
  const classe = usStyles();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleavailable, setGoogav] = useState(true);
  const [loginFal, setLoginFal] = useState(false);
  const [mod, setMod] = useState(false);
  const [name, setName] = useState("");
  const [signupcolor, setSignupColor] = useState("warning");
  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const [op, setOp] = React.useState(false);
  const [ope,setOpe] = React.useState(false) ;
  const { ...rest } = props;

  const ResponseGoogle = (response) => {
    return null;
    /*if(googleavailable === false){
 
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
    else{return null}*/
  }

  function handleSignin(e) {
    console.log(email);
    axios({
      method: 'post',
      url: "https://limitless-lowlands-36879.herokuapp.com/users/login/",
      headers: {},
      data: {
        email: email,
        password: password
      }
    }).then(res => {
      console.log(res);
      if ((res.data.status) !== 401) {
        const token = res.data.token;
        sessionStorage.setItem('TokenKey', token);
        window.location.reload();
      }
      else {
        setLoginFal(true);
      }
    })
  }
  const responseSuccessGoogle = (response) => {
    axios({
      method: 'post',
      url: "https://limitless-lowlands-36879.herokuapp.com/users/google/login/",
      headers: {},
      data: {
        tokenId: response.tokenId
      }
    }).then(res => {
      console.log(res)
      const token = res.data.token;
      sessionStorage.setItem('TokenKey', token);
      window.location.reload();
    })
  }
  const HandleLoginFaliure = () => {
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOp(false);
      setLoginFal(false);
    };
    setOp(true);
    if (loginFal === true) {
      //setLoginFal(false);
      return (
        <Snackbar open={op} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Login failure!
        </Alert>
        </Snackbar>
      );
    }
    else {
      return null;
    }
  }
  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    return (false)
  }
  function handleSignup(e) {
    if (!ValidateEmail(email)) {
      alert("Please enter a valid Email") ;
    } else {
      axios({
        method: 'post',
        url: "https://limitless-lowlands-36879.herokuapp.com/users/signup",
        headers: {},
        data: {
          name: name,
          email: email,
          password: password
        }
      }).then(res => {
        setMessage(res.data.message);
        if ((res.data.status) === 201) {
          setSignupColor("success");
          setMod(false) ;
          setModal(true) ;
        }
        else {
          setSignupColor("error");
        }
        //    const token = res.data.token;
        //     console.log(token);
        //    sessionStorage.setItem('TokenKey', token);
        //    window.location.href = "/index";
      })
    }
  }
  const HandleSignupResponse = () => {
    if (message !== "") {
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        setOpen(false);
        setMessage("");
      };
      setOpen(true);
      return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={signupcolor}>
            {message}
          </Alert>
        </Snackbar>
      );

    }
    else {
      return null;
    }
  }

  return (
    <div>
      <ResponseGoogle /><HandleLoginFaliure /><HandleSignupResponse />
      <Button style={{ background: "white", fontSize: "1em", marginRight: "10px" }} simple color="github" round size="sm" onClick={() => setModal(true)}>
        Login
          </Button>
      <Button style={{ background: "white", fontSize: "1em" }} simple color="github" round size="sm" onClick={() => setMod(true)}>
        Sign-up
            </Button>
      <Dialog
        classes={{
          root: classe.center,
          paper: classe.modal
        }}
        open={modal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModal(false)}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description">
        <form className={classes.form}>
          <CardHeader color="success" className={classes.cardHeader}>
            <h4>Log In</h4>
            <h4>Log In </h4>
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
                onFailure={(e) => {
                  setGoogav(false);
                  ResponseGoogle(1);
                }}
                cookiePolicy={'single_host_origin'}
              />
            </div>
          </CardHeader>
          <p className={classes.divider}>Or Be Classical</p>
          <CardBody>
            <TextField
              label="Email..."
              id="email"
              type="email"
              fullWidth
              style={{ paddingBottom: '10%' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Email style={{ color: "purple" }} />
                  </InputAdornment>
                )
              }}

              value={email}
              onChange={e => { setEmail(e.target.value) }}
            />
            <TextField
              label="Password"
              id="pass"
              type="password"
              fullWidth
              style={{ paddingBottom: '10%' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LockIcon style={{ color: "purple" }} />
                  </InputAdornment>
                )
              }}
              value={password}
              onChange={e => { setPassword(e.target.value) }}
            />
          </CardBody>
          <CardFooter className={classes.cardFooter}>
            <div>
              <Button simple color="success" size="lg" onClick={handleSignin}>
                Get started
                    </Button> or <Button simple color="info" size="lg" onClick={() => setMod(true)}>Sign-Up</Button>
            </div>
          </CardFooter>
          <CardFooter className={classes.cardFooter}>
            <div>
              <a href="/forgotpass">Forgot Password?</a>
            </div>
          </CardFooter>
        </form>
      </Dialog>
      <Dialog
        classe={{
          root: classe.center,
          paper: classe.modal
        }}
        open={mod}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setMod(false)}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        <form className={classes.form} style={{ width: "450px" }}>
          <CardHeader color="success" className={classes.cardHeader}>
            <h4>SIGN UP</h4>
            <h4>SIGN UP</h4>
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
              onFailure={(e) => {
                setLoginFal(true);
              }}
              cookiePolicy={'single_host_origin'}
            />
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
                    <PersonIcon style={{ color: "purple" }} />
                  </InputAdornment>
                )
              }}

              value={name}
              onChange={e => { setName(e.target.value) }}
            />

            <TextField
              label="Email..."
              id="email"
              type="email"
              fullWidth
              style={{ paddingBottom: '10%' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Email style={{ color: "purple" }} />
                  </InputAdornment>
                )
              }}

              value={email}
              onChange={e => { setEmail(e.target.value) }}
            />
            <TextField
              label="Password"
              id="pass"
              type="password"
              fullWidth
              style={{ paddingBottom: '10%' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LockIcon style={{ color: "purple" }} />
                  </InputAdornment>
                )
              }}
              value={password}
              onChange={e => { setPassword(e.target.value) }}
            />
          </CardBody>
          <CardFooter className={classes.cardFooter}>
            <Button simple color="primary" size="lg" onClick={handleSignup}>
              Get started
                    </Button>
          </CardFooter>
        </form>
      </Dialog>
    </div>
  );
}
