import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockIcon from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core";

import { Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://limitless-lowlands-36879.herokuapp.com/">
        MECOM
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    // https://source.unsplash.com/daily
    // https://images.unsplash.com/photo-1578621643529-93cb0b82e604?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80
    // https://images.unsplash.com/photo-1578621643529-93cb0b82e604?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80
    // https://images.unsplash.com/photo-1593462442529-31c195b98136?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80
    backgroundImage: "url(https://images.unsplash.com/photo-1593093859523-9dcded0cc7da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80)",
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(20, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // TODO IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginSide = (props) => {
  //states
  const [redir, setRedir] = useState({
    redirect: false
  })
  const [load, setLoad] = useState({
    show: false
  })
  const [snack, setSnack] = useState({
    show: false,
    message: "",
    color: "lightBlue"
  })

  //snackHandler
  const snackbarClose = (event) => {
    setSnack({
      show: false,
      message: ""
    })
  }

  //removing previous token if Any
  // if (cookies.get("Token")) {
  //   cookies.remove("Token");
  // }

  //consts
  const classes = useStyles();


  //on form login click
  const afterSubmit = (event) => {
    //Prevent Reload
    event.preventDefault();
    event.stopPropagation();
    setLoad({
      show: true
    })
    const username = event.target.username.value;
    const password = event.target.password.value;
    axios.post("https://limitless-lowlands-36879.herokuapp.com/admin/login", {
      email: username,
      password: password
    })
      .then(response => {
        
        if (!response.data.token) {
          setLoad({
            show: false
          })
          setSnack({
            show: true,
            message: "wrong credentials",
            color: "red"
          })
        }
        else {
          cookies.set("Token", response.data.token, { path: "/", expires: 0 });
          setTimeout(() => {
            setSnack({
              show: true,
              message: "Logged In",
              color: "green"
            })
            setLoad({
              show: false
            })
            setRedir({ redirect: true });
          },2000) ;
        }
      })
      .catch(err => {
        setLoad({
          show: false
        });
        console.log(err);
      })
  }
  let redirect = null;
  //invalid URL Access without login
  useEffect(() => {
    if( props.location.state && props.location.state.message ){
      setSnack({
        show : true ,
        message : props.location.state.message,
        color : "red"
      })
    }
  },[])

  // redirect
  if (redir.redirect && !redirect)
    redirect = <Redirect to={{
      pathname: '/dashboard',
      state: { justLoggedIn: true }
    }}
    />;
  let loader = null;
  if (load.show)
    loader = <div style={{ width: "50%", margin: "auto" }}><LinearProgress /></div>

  return (
    <Grid container component="main" className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snack.show}
        autoHideDuration={4000}
        onClose={snackbarClose}
        bodystyle={{ backgroundColor: 'teal', color: 'coral' }}
        message={<span id="message-id">{snack.message}</span>}

      >
        <SnackbarContent style={{
          backgroundColor: snack.color,
        }}
          action={[
            <button key={"close"} onClick={snackbarClose} style={{ background: "none", border: "none", color: "white" }}>x</button>
          ]}
          message={<span id="client-snackbar">{snack.message}</span>}
        />
      </Snackbar>
      {redirect}
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <LockIcon />
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form
            className={classes.form}
            onSubmit={afterSubmit} >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="current-username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            {loader}
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default LoginSide;