import React,{useState, useEffect} from 'react';
import axios from 'axios';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import NavBar from "components/Header/Navbar";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Footer from "components/Footer/Footer.js";
//import Categories from "components/Header/CategoryBar.js";
import classNames from "classnames";
import Typography from '@material-ui/core/Typography';
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import wimg from 'assets/img/wishlist.png';
import Loading from '../Loading';

import { withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import chair from 'assets/img/chairs.jpg';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { roseColor } from 'assets/jss/material-kit-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: roseColor,
    color: theme.palette.common.white,
    fontSize: 20,
  },
  body: {
    fontSize: 20,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function CustomizedTables() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios({
      method: 'get',
      url: "https://limitless-lowlands-36879.herokuapp.com/cart/",
      headers: {
        'Authorization': 'Bearer '+Token,
      } 
    })
    .then(res =>{
      if(res.data.status === 401){
        window.location.href="/login-page";
      }
      count = res.data.count;
      totalAmount = res.data.Price;
      setProducts(res.data.cart);
    })
  }, [])

  const handleCartRemove=(e)=>{
    axios({
      method: 'delete',
      url: "https://limitless-lowlands-36879.herokuapp.com/cart/" + e,
      headers: {
        'Authorization': 'Bearer '+Token,
      } 
    })
    .then(res =>{
      if(res.data.status === 401){
        window.location.href="/login-page";
      }
      else if(res.data.status === 200){
        window.location.href ="/cart-page";
      }
      else{
        setAlert({
          status: res.data.status,
        })
      }
    })
  }

  const CartDeleteResponse=()=>{
    if(alert.status === 500){
      return(<SnackbarContent
          message={
            <span>
              Something Went Wrong
            </span>
          }
          close
          color="warning"
          icon="info_outline"
        />);
      }
      else{return null;}
    }

  const HandleCart = (e) => {
    if (quantity > product.quantity) {
      alert("Set Appropriate Quantity")
      return;
    }
    axios({
      method: 'post',
      url: "https://limitless-lowlands-36879.herokuapp.com/cart/",
      headers: {
        'Authorization': 'Bearer ' + Token,
      },
      data: {
        productId: ID,
        quantity: quantity,
      }    
    })
    .then(res => {
      console.log(res);
      if (res.data.status === 201) {
        setCartRes({
          message: res.data.message,
          color: "success"
        })
      }
      else if (res.data.status === 401) {
        window.location.href = "/login-page";
      }
      else {
        setCartRes({
          message: res.data.message,
          color: "danger"
        })
      }
    })
  }
  const HandleCartResponse = () => {
    if (cartResponse.message) {
      return (<SnackbarContent
        message={
          <span>
            {cartResponse.message}
          </span>
        }
        close
        color={cartResponse.color}
        icon="info_outline"
      />);
    }
    else {
      return null;
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Wishlist</StyledTableCell>
            <StyledTableCell align="center">Product</StyledTableCell>
            <StyledTableCell align="center">Price&nbsp;(£)</StyledTableCell>
            <StyledTableCell align="center">Quantity&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {products.map(pro =>(
          <StyledTableRow key={pro.name}>
            <StyledTableCell component="th" scope="row" padding="none" align="center"><img style={{height: "22vh", width: "auto"}} src= {"https://limitless-lowlands-36879.herokuapp.com/" + pro.image} /></StyledTableCell>
            <StyledTableCell align="center"><Link to={"/Display/" + pro.productId} target="_blank">{pro.name}</Link></StyledTableCell>
            <StyledTableCell align="center">{pro.price}</StyledTableCell>
            <StyledTableCell align="center">{pro.quantity}</StyledTableCell>
            <StyledTableCell align="center"><IconButton color="primary" aria-label="add to shopping cart">
        <AddShoppingCartIcon />
      </IconButton>  <IconButton style={{marginLeft:"8px"}} aria-label="delete">
        <DeleteIcon />
      </IconButton></StyledTableCell>
          </StyledTableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


function Ecart () {
  const Home = () => {
    window.location.href = "/";
  }
  return (
    <div className="container-fluid" style={{paddingBottom:"40px"}}>
      <Typography color="textPrimary" style={{textAlign: "center"}} variant="h2" gutterBottom>Your Cart is empty</Typography>
      <img style={{width:"14vw", display:"block", marginLeft:"auto", marginRight:"auto"}} src={wimg} alt="Empty-Cart" />
      <Typography color="textSecondary" style={{textAlign: "center"}} variant="h5" gutterBottom>Add items to cart now!</Typography>
      <Button variant="contained" style={{display:"block", marginLeft:"auto", marginRight:"auto"}} size="large" color="secondary" onClick={Home}> Shop Now</Button>
    </div>
  );
}

const dashboardRoutes = [];

const usStyles = makeStyles(styles);
const Token = sessionStorage.getItem('TokenKey');
console.log(Token);
let count = 0;
let totalAmount =0;
export default function WishlistDisplay(props) {
  const classes = usStyles();
  const { ...rest } = props;
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [alert, setAlert]= useState([]);
  const ID = props.match.params.productID;
  const [cartResponse, setCartRes] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  if(!Token){
    window.location.href="/login-page";
  }

  useEffect(() => {
    axios({
      method: 'get',
      url: "https://limitless-lowlands-36879.herokuapp.com/cart/",
      headers: {
        'Authorization': 'Bearer '+Token,
      } 
    })
    .then(res =>{
      if(res.data.status === 401){
        window.location.href="/login-page";
      }
      count = res.data.count;
      totalAmount = res.data.Price;
      setProducts(res.data.cart);
      setLoading(false);
    })
  }, [])
    
  const handleCartRemove=(e)=>{
    axios({
      method: 'delete',
      url: "https://limitless-lowlands-36879.herokuapp.com/cart/" + e,
      headers: {
        'Authorization': 'Bearer '+Token,
      } 
    })
    .then(res =>{
      if(res.data.status === 401){
        window.location.href="/login-page";
      }
      else if(res.data.status === 200){
        window.location.href ="/cart-page";
      }
      else{
        setAlert({
          status: res.data.status,
        })
      }
    })
  }

  const CartDeleteResponse=()=>{
    if(alert.status === 500){
      return(<SnackbarContent
          message={
            <span>
              Something Went Wrong
            </span>
          }
          close
          color="warning"
          icon="info_outline"
        />);
      }
      else{return null;}
    }

  const HandleCart = (e) => {
    if (quantity > product.quantity) {
      alert("Set Appropriate Quantity")
      return;
    }
    axios({
      method: 'post',
      url: "https://limitless-lowlands-36879.herokuapp.com/cart/",
      headers: {
        'Authorization': 'Bearer ' + Token,
      },
      data: {
        productId: ID,
        quantity: quantity,
      }    
    })
    .then(res => {
      console.log(res);
      if (res.data.status === 201) {
        setCartRes({
          message: res.data.message,
          color: "success"
        })
      }
      else if (res.data.status === 401) {
        window.location.href = "/login-page";
      }
      else {
        setCartRes({
          message: res.data.message,
          color: "danger"
        })
      }
    })
  }
  const HandleCartResponse = () => {
    if (cartResponse.message) {
      return (<SnackbarContent
        message={
          <span>
            {cartResponse.message}
          </span>
        }
        close
        color={cartResponse.color}
        icon="info_outline"
      />);
    }
    else {
      return null;
    }
  }

  return (
    <div>
      <NavBar/>
      {loading ? <Loading /> :(
        <div style={{ marginTop:"10vh"}} className={classNames(classes.main, classes.mainRaised)}>
          {/* <Categories/> */}
          <h4 style={{color:"green", marginLeft:"1vw"}} ><b>Wishlist</b> ({count})</h4>
          {count ? (
            <div className={classes.container}>
              <CartDeleteResponse/>
              {products.map(pro =>(
                <div key= {pro._id}  style={{margin:"2vh"}} >
                  <Grid className ="element"  container spacing={3} >
                    <Grid item xs={3}>
                      <img style={{height: "30vh", width: "auto"}} src= {"https://limitless-lowlands-36879.herokuapp.com/" + pro.image} />
                    </Grid>
                    <hr/>
                    <Grid item xs style={{textAlign:"top"}}>
                      <Link to={"/Display/" + pro.productId} target="_blank">
                        <h4>{pro.name}</h4>
                      </Link>
                      <Link style={{color:"#f44336"}}to={"/Display/" + pro.productId} target="_blank">
                        £: {pro.price}
                      </Link>
                      <h5 style={{color:"black"}}>Quantity: {pro.quantity}</h5>
                      <Button  onClick={()=> handleCartRemove(pro._id)} style={{display:"inline", marginLeft:"5vw"}} variant="contained" color="primary" >Move to cart</Button>
                      <Button  onClick={()=> HandleCart(pro._id)} style={{ marginLeft:"5vw"}} variant="contained" color="primary" >Remove</Button>
                    </Grid>
                  </Grid> 
                  <hr/>
                </div>
              ))}
            </div>):
          <Ecart />}
        </div>
      )}
      <CustomizedTables />
      <Footer/>
    </div>
  );
}
