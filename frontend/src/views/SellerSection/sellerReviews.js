import React, { useState, useEffect } from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


import { mainListItems, secondaryListItems } from './components/Dashboard-components/listItems';
import { default as LLink } from "react-router-dom/Link";
import Axios from 'axios';
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";
import { Snackbar, SnackbarContent } from "@material-ui/core";
import Reviews from './components/Dashboard-components/Reviews/Reviews';
const cookies = new Cookies();


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" style={{ margin: "auto 24px", position: "absolute", right: "12px", bottom: "6px" }}>
      {'Copyright © '}
      <Link color="inherit" href="https://engagenreap.com/">
        Enr
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    backgroundSize: "cover",
    background: 'linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7)) , url("https://wallpaperaccess.com/full/256531.jpg") no-repeat center center',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    boxShadow: "2px 3px 8px lightgrey",
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const Dashboard = (props) => {
  //states

  const [name, setName] = React.useState("Loading...");
  const [nameSeller, setNameSeller] = React.useState("");

  const [loginSnack, setLoginSnack] = useState({
    show: true
  })
  const [snack, setSnack] = useState({
    show: false,
    message: "",
    color: "lightBlue"
  })
  const [open, setOpen] = React.useState(true);
  const [orders, setOrders] = useState({
    orders: null
  })
  const [sellers, setSellers] = useState({
    sellers: null
  })
  const [pending, setPending] = useState({
    pending: "+"
  })
  const [redirect, setRedirect] = useState({
    to: null
  })
  const [http, setHttp] = useState({
    set: false
  })
  const [notification, setNotification] = useState({
    notification: true
  })
  // const [token,setToken] = useState("") ;


  //state Handlers
  const snackbarClose = (event) => {
    setSnack({
      show: false
    })
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const token = cookies.get("Token");
  const sellerToken = sessionStorage.getItem("TokenSeller");
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  //redirects nullified for now
  // let redirect = null;
  // if (!token && !(props.location.state && props.location.state.justLoggedIn) && false) {
  //   redirect = <Redirect to={{
  //     pathname: '/login',
  //     state: { message: null }
  //   }}
  //   />;
  // }

  //Snacks
  // if (loginSnack.show) {
  //   setLoginSnack({
  //     show: false
  //   })
  //   setSnack({
  //     show: true,
  //     message: "Logged In",
  //     color: "Green"
  //   })
  // }

  //logout handler
  const logoutHandler = () => {
    console.log(sellerToken);
    cookies.remove('TokenSeller', { path: '/seller-login' });
    console.log(sellerToken);
    setRedirect({
      to: <Redirect to="/seller-login" />
    })
    setLoginSnack({
      show: true
    })
  }
  const removeNotificationHandler = () => {
    setNotification({
      notification: false
    })
  }

  //data from orders
  useEffect(() => {
    // console.log(token) ;

    Axios({
      method: 'get',
      url: "https://limitless-lowlands-36879.herokuapp.com/sellers/myinfo",
      headers: {
        'Authorization': 'Bearer ' + sellerToken,
      }
    }).then(res => {
      // console.log(sellerToken);
      console.log(res.data);
      setName("Hi, " + res.data.sellers.name);
      setNameSeller(res.data.sellers.name);
      sessionStorage.setItem('TokenSellerID', res.data.sellers._id);
    })
  }, []);

  return (
    <div className={classes.root} >
      {redirect.to}
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
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)} style={{ background: '#2E3B55' }}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            style={{ color: "white" }}
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" display="inline" variant="h6" color="inherit" noWrap className={classes.title}>
            Enr SellerHub - Product Reviews
          </Typography>

          <Typography>{name}</Typography>

          {/* <Tooltip title="Products" TransitionComponent={Zoom} >
            <IconButton color="inherit">
              <LLink to="/dashboard/products" >
                {notification.notification ?
                  <Badge badgeContent={pending.pending} color="secondary">
                    <NotificationsIcon style={{ color: "white" }} onClick={removeNotificationHandler} />
                  </Badge> :
                  <Badge color="secondary">
                    <NotificationsIcon style={{ color: "white" }} />
                  </Badge>
                }
              </LLink>
            </IconButton>
          </Tooltip> */}
          <Tooltip title="Logout" TransitionComponent={Zoom} >
            <IconButton onClick={logoutHandler}>
              <ExitToAppIcon style={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon style={{ color: "white", outline: "none" }} />
          </IconButton>
        </div>
        <List>{mainListItems}</List>
        <Divider style={{ background: "lightgrey" }} />
        <List onClick={logoutHandler}>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>

          {/* reviews section */}
          <Reviews/>
          <Grid container spacing={3}>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default Dashboard;