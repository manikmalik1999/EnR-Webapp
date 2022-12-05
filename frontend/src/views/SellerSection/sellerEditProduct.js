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
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


import { mainListItems, secondaryListItems } from './components/Dashboard-components/listItems';
// import { default as LLink } from "react-router-dom/Link";
import Axios from 'axios';
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";
import { Snackbar, SnackbarContent } from "@material-ui/core";

import LinearProgress from '@material-ui/core/LinearProgress';

import DescriptionIcon from '@material-ui/icons/Description';
import CategoryIcon from '@material-ui/icons/Category';
import MoneyIcon from '@material-ui/icons/Money';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import InputAdornment from "@material-ui/core/InputAdornment";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import CardFooter from "components/Card/CardFooter.js";

import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import PersonIcon from '@material-ui/icons/Person';



const cookies = new Cookies();
const sellerToken = localStorage.getItem('TokenSeller');

let n, cat, pri, desc, quant;

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" style={{ margin: "auto 24px", position: "absolute", right: "12px", bottom: "6px" }}>
            {'Copyright © '}
            <Link color="inherit" href="http://localhost:5000/">
                MECOM
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

    const ID = props.match.params.productId;
    const [product, setProduct] = useState({
        name: "Loading...",
        desc: "Loading...",
        quantity: "Loading...",
        price: "Loading...",
        category: "Loading..."
    });
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [loading, setLoading] = useState(false);

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    useEffect(() => {
        axios({
            method: 'get',
            url: "http://localhost:5000/products/" + ID,
            headers: {
                'Authorization': 'Bearer ' + sellerToken,
            }
        })
            .then(res => {
                console.log(res.data.product);
                setProduct({
                    name: res.data.product.name,
                    desciption: res.data.product.description,
                    quantity: res.data.product.quantity,
                    price: res.data.product.price,
                    category: res.data.product.category
                });
            })
    }, [])

    const handleUpdate = () => {
        setLoading(true);
        if (name) { n = name }
        else n = product.name

        if (description) { desc = description }
        else desc = product.description

        if (quantity) { quant = quantity }
        else quant = product.quantity;

        if (category) { cat = category }
        else cat = product.category;

        if (price) { pri = price }
        else pri = product.price;
        axios({
            method: 'patch',
            url: "http://localhost:5000/products/" + ID,
            headers: {
                'Authorization': 'Bearer ' + sellerToken,
            },
            data: {
                Product: {
                    name: n,
                    description: desc,
                    quantity: quant,
                    price: pri,
                    category: cat,
                }
            }
        })
            .then(res => {
                setLoading(false);
                window.location.href = "/seller-all-products";
                // alert(res.data.message);
            })
            .catch(err => {
                window.location.href = "/seller-all-products";
                setLoading(false);
                console.log(err);
            })

    }
    let loader = null;
    if (loading) {
        loader = <div style={{ width: "50%", margin: "auto", textAlign: "center" }}><LinearProgress color="primary" /><p style={{ marginTop: "12px" }}>Please Hold on. This may take a while.</p></div>
    }

    const [name2, setName2] = React.useState("Loading...");

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

    // const classes = useStyles();
    const token = cookies.get("Token");
    const sellerToken = localStorage.getItem("TokenSeller");
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
    //     setLoginSnack({
    //         show: false
    //     })
    //     setSnack({
    //         show: true,
    //         message: "Logged In",
    //         color: "Green"
    //     })
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
            url: "http://localhost:5000/sellers/myinfo",
            headers: {
                'Authorization': 'Bearer ' + sellerToken,
            }
        }).then(res => {
            // console.log(sellerToken);
            // console.log(res.data);
            setName2("Hi, " + res.data.sellers.name);
            localStorage.setItem('TokenSellerID', res.data.sellers._id);
        })

        Axios.get("http://localhost:5000/orders", {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => {
                // console.log(response) ;
                setOrders({
                    orders: response.data.orders
                })
                // setHttp({
                //   set: true
                // })
            })
            .catch(err => {
                console.log(err);
            });
        Axios.get("http://localhost:5000/products", {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => {
                // console.log(response.data) ;
                const prods = response.data.products.filter(product => {
                    if (product.approved === "pending") {
                        return true;
                    }
                    return false;
                })
                setPending({
                    pending: prods.length || 0
                })
            })
            .catch(err => {
                console.log(err);
            });
        Axios.get("http://localhost:5000/sellers", {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => {
                setSellers({
                    sellers: response.data.users
                })
            })
            .catch(err => {
                console.log(err);
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
                        MECOM SellerHub - Edit Product
          </Typography>
                    <Typography>{name2}</Typography>

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

                    {/* edit-product */}
                    <div>
                        <GridContainer justify="center" style={{ paddingTop: "8px" }}>
                            <GridItem xs={12} sm={8} md={6}>
                                <Card className={classes[cardAnimaton]} style={{ background: "#EDF0EE", padding: "24px" }}>
                                    <form className={classes.form}>
                                        {/* <CardHeader style={{ background: "#022D41", borderTopLeftRadius: "14px", borderBottomRightRadius: "14px",padding:"32px" }} className={classes.cardHeader}>
                                            <h4 style={{ color: "white" }}>Edit Product</h4>
                                        </CardHeader> */}
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
                                                label="category"
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
                                        </CardBody>
                                        <CardFooter className={classes.cardFooter}>
                                            <Button variant="outlined" color="success" style={{ background: "#2E3B55", width: '100%' }} size="lg" onClick={handleUpdate}>
                                                Update
                                             </Button>
                                        </CardFooter>
                                        <div style={{ margin: "12px auto" }}>
                                            {loader}
                                        </div>
                                    </form>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </div>
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