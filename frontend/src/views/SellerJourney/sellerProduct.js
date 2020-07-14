import React,{useState, useEffect} from 'react';
import axios from 'axios'; 
import NavBar from "components/Header/sellerNav";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
// import Link from '@material-ui/core/Link';
import {Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Footer from "components/Footer/Footer.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components

// @material-ui/icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
// core components
import styles from "assets/jss/material-kit-react/views/landingPage.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);
const Token = sessionStorage.getItem('TokenSeller');
export default function SellerProductDisplay(props) {
  const classes = useStyles();
  const { ...rest } = props;
    const [response, setResponse]=useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: "http://localhost:5000/sellers/products",
            headers: {
                'Authorization': 'Bearer '+Token,
            } 
          })
      .then(res =>{
        console.log(res);
        setProducts(res.data.product);
      })
      }, [])

    const handleDelete =(e)=>{
      console.log(e.currentTarget.id);
      // alert(e.currentTarget.id);
        axios({
            method: 'delete',
            url: "http://localhost:5000/products/"+ e.currentTarget.id,
            headers: {
                'Authorization': 'Bearer '+Token,
            } 
        }).then(res =>{
          if(res.status === 401){window.location.href="/seller-login";}
                setResponse(res.status);
          })
    }

    const handleEdit =(e) =>{
       console.log(e.currentTarget.id);
       let ID = e.currentTarget.id;
       if(ID){
        window.location.href="/seller-edit/"+ID;}
        // alert(e.target.id);
    }
    const HandleDeleteResponse=(e)=>{
      if(response === 500){
    return( <SnackbarContent
        message={
          <span>
          Something Went Wrong
          </span>
        }
        close
        color="warning"
        icon="info_outline"
      />)}
      else if(response === 200){
        return( <SnackbarContent
          message={
            <span>
            Product Deleted
            </span>
          }
          close
          color="danger"
          icon="info_outline"
        />)
      }
      else 
      return null;
    }
    // let filterpro = products.filter(
    //     (e)=>{
    //         return( e.category.toUpperCase().includes(category.toUpperCase()) && e.approved.toUpperCase().includes("TRUE"));
    //     }
    // )
  return (
    <div>
      <NavBar value={1} />

      <div style={{ marginTop:"0vh"}} className={classNames(classes.main, classes.mainRaised)}>
        <h4 style={{color:"green", marginLeft:"1vw"}} ><b></b> </h4>
        <div className={classes.container}>
        <HandleDeleteResponse/>
                    <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell> Name </TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Edit</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {products.map((pro) => (
                        <TableRow key={pro._id}>
                        <TableCell component="th" scope="row">
                        {pro.name}
                        </TableCell>

                        <TableCell align="right">
                        {pro.price}
                        </TableCell>
                        <TableCell align="right">
                        {pro.quantity}
                            </TableCell>
                        <TableCell align="right">
                        {pro.category}
                        </TableCell>
                        <TableCell align="right">{pro.approved }</TableCell>


                        <TableCell align="right">
                        <IconButton id={pro._id} onClick={handleEdit} aria-label="Edit">
                                <EditIcon/>
                            </IconButton>         
                        </TableCell>


                        <TableCell align="right">
                        <IconButton id={pro._id} onClick={handleDelete} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>         
                        </TableCell>


                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
        </div>
      </div>
 
      <Footer/>
   
    </div>
  );
}
