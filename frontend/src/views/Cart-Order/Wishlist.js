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


const dashboardRoutes = [];

const usStyles = makeStyles(styles);
const Token = sessionStorage.getItem('TokenKey');
let count = 0;

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


function Ecart () {
  const Home = () => {
    window.location.href = "/";
  }
  return (
    <div className="container-fluid" style={{paddingBottom:"40px",minHeight:"520px"}}>
      <img style={{width:"30vw", display:"block", marginLeft:"auto", marginRight:"auto"}} src={wimg} alt="Empty-Wishlist" />
      <Button variant="contained" style={{ display: "block",margin:"auto",width:"20%",backgroundColor: "#00897b"}} size="large" color="secondary" onClick={Home}> Shop Now</Button>
    </div>
  );
}

export default function WishlistDisplay() {
  const classes = useStyles();
  const classe = usStyles();
  const [products, setProducts] = useState([]);
  const [alert, setAlert]= useState([]);
  const [cartResponse, setCartRes] = useState([]);
  const [loading, setLoading] = useState(true);

  if(!Token){
    window.location.href="/login-page";
  }

  useEffect(() => {
    axios({
      method: 'get',
      url: "https://limitless-lowlands-36879.herokuapp.com/wishlist/",
      headers: {
        'Authorization': 'Bearer '+Token,
      } 
    })
    .then(res =>{
      if(res.data.status === 401){
        window.location.href="/login-page";
      }
      count = res.data.count;
      console.log(res.data);
      setProducts(res.data.wishlist);
      setLoading(false);
    })
  }, [])

  const handleRemove=(e)=>{
    axios({
      method: 'delete',
      url: "https://limitless-lowlands-36879.herokuapp.com/wishlist/" + e,
      headers: {
        'Authorization': 'Bearer '+Token,
      } 
    })
    .then(res =>{
      if(res.data.status === 401){
        window.location.href="/login-page";
      }
      else if(res.data.status === 200){
        window.location.reload();
      }
      else{
        setAlert({
          status: res.data.status,
        })
      }
    })
  }

  const HandleCart = (id, delid) => {
    let quantity = 1;
    console.log(id);
    console.log(delid);
    axios({
      method: 'post',
      url: "https://limitless-lowlands-36879.herokuapp.com/cart/",
      headers: {
        'Authorization': 'Bearer ' + Token,
      },
      data: {
        productId: id,
        quantity: quantity,
      }

    }).then(res => {
      console.log(res);
      if (res.data.status === 201) {
        handleRemove(delid);
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

  const DeleteResponse=()=>{
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

  const HandleWishResponse = () => {
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
    <div style={{minHeight:"590px"}}>
      <NavBar/>
        <div style={{ marginTop:"10vh"}} className={classNames(classe.main, classe.mainRaised)}>
          <h4 style={{color:"green", marginLeft:"1vw", padding:"1vw"}} ><b>Wishlist</b> ({count})</h4>
    <HandleWishResponse />
    <DeleteResponse />
    {loading ? <Loading /> : (count ? (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead >
          <TableRow style={{backgroundColor: "#00897b"}}>
            <StyledTableCell style={{backgroundColor: "#00897b"}} align="center">Wishlist</StyledTableCell>
            <StyledTableCell style={{backgroundColor: "#00897b"}} align="center">Product</StyledTableCell>
            <StyledTableCell style={{backgroundColor: "#00897b"}}  align="center">Price&nbsp;(£)</StyledTableCell>
            {/* <StyledTableCell style={{backgroundColor: "#00897b"}} align="center">Quantity&nbsp;</StyledTableCell> */}
            <StyledTableCell style={{backgroundColor: "#00897b"}} align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {products.map(pro =>(
    
          <StyledTableRow style={{padding:"1vw",marginTop:"1vh"}} key={pro.name}>
            <StyledTableCell component="th" scope="row" padding="none" align="center"><img style={{height: "22vh", width: "auto"}} src= {"https://limitless-lowlands-36879.herokuapp.com/" + pro.image} /></StyledTableCell>
            <StyledTableCell align="center"><Link to={"/Display/" + pro.productId} target="_blank">{pro.name}</Link></StyledTableCell>
            <StyledTableCell align="center">{pro.price}</StyledTableCell>
            {/* <StyledTableCell align="center">{pro.quantity}</StyledTableCell> */}
            <StyledTableCell align="center"><IconButton onClick={() => HandleCart(pro.productId, pro._id)} color="primary" aria-label="add to shopping cart">
        <AddShoppingCartIcon />
      </IconButton>  <IconButton onClick={() => handleRemove(pro._id)} style={{marginLeft:"8px"}} aria-label="delete">
        <DeleteIcon />
      </IconButton></StyledTableCell>
          </StyledTableRow>
          
        ))}
        </TableBody>
      </Table>
    </TableContainer>
    ): <Ecart />)}
    </div>
    <Footer/>
    </div>
  );
}
