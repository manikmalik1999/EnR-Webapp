import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from "components/Header/sellerNav";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles, withStyles } from "@material-ui/core/styles";
// import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Footer from "components/Footer/Footer.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import MuiTableCell from "@material-ui/core/TableCell";
import { Box } from "@material-ui/core";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components

// @material-ui/icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
// core components
import styles from "assets/jss/material-kit-react/views/landingPage.js";

const dashboardRoutes = [];

const TableCell = withStyles({
  root: {
    borderBottom: "2px solid #B1D8B7"
  }
})(MuiTableCell);

const usStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

const useStyles = makeStyles(styles);
const Token = sessionStorage.getItem('TokenSeller');
export default function SellerProductDisplay(props) {
  const classs = usStyles();
  const classes = useStyles();
  const { ...rest } = props;
  const [response, setResponse] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: "https://limitless-lowlands-36879.herokuapp.comsellers/products",
      headers: {
        'Authorization': 'Bearer ' + Token,
      }
    })
      .then(res => {
        console.log(res);
        setProducts(res.data.product);
      })
  }, [])

  const handleDelete = (e) => {
    console.log(e.currentTarget.id);
    // alert(e.currentTarget.id);
    axios({
      method: 'delete',
      url: "https://limitless-lowlands-36879.herokuapp.comproducts/" + e.currentTarget.id,
      headers: {
        'Authorization': 'Bearer ' + Token,
      }
    }).then(res => {
      if (res.status === 401) { window.location.href = "/seller-login"; }
      setResponse(res.status);
    })
  }

  const handleEdit = (e) => {
    console.log(e.currentTarget.id);
    let ID = e.currentTarget.id;
    if (ID) {
      window.location.href = "/seller-edit/" + ID;
    }
    // alert(e.target.id);
  }
  const HandleDeleteResponse = (e) => {
    if (response === 500) {
      return (<SnackbarContent
        message={
          <span>
            Something Went Wrong
          </span>
        }
        close
        color="warning"
        icon="info_outline"
      />)
    }
    else if (response === 200) {
      return (<SnackbarContent
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
    <div style={{
      backgroundColor: "#107869"
    }}>
      <NavBar />

      <div style={{ marginTop: "8px", background: "#B1D8B7", width: "84%", borderRadius: "8px", margin: "auto" }}>
        <h4 style={{ color: "green", marginLeft: "1vw" }} ><b></b> </h4>
        <div className={classes.container} style={{ padding: "18px", paddingTop: "28px", minHeight: "580px" }}>
          <HandleDeleteResponse />
          <div style={{ boxShadow: "2px 3px 12px #1A5653", minHeight: "50px", margin: "auto" }}>
            <Box borderRadius={10} >
              <Table className={classs.table} aria-label="simple table" style={{ background: "#022D41", borderCollapse: "collapse" }}>
                {products.length === 0 ?
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ color: "#B1D8B7", fontWeight: "700" }} align="center">No Particulars Present Here</TableCell>
                    </TableRow>
                  </TableHead>
                  :
                  <TableHead>
                    <TableRow style={{ borderBottom: "none !important" }} >
                      <TableCell style={{ color: "#B1D8B7", fontWeight: "700" }} > Name </TableCell>
                      <TableCell style={{ color: "#B1D8B7", fontWeight: "700" }} align="right">Price</TableCell>
                      <TableCell style={{ color: "#B1D8B7", fontWeight: "700" }} align="right">Quantity</TableCell>
                      <TableCell style={{ color: "#B1D8B7", fontWeight: "700" }} align="right">Category</TableCell>
                      <TableCell style={{ color: "#B1D8B7", fontWeight: "700" }} align="right">Status</TableCell>
                      <TableCell style={{ color: "#B1D8B7", fontWeight: "700" }} align="right">Edit</TableCell>
                      <TableCell style={{ color: "#B1D8B7", fontWeight: "700" }} align="right">Delete</TableCell>
                    </TableRow>
                  </TableHead>}
                {products.length === 0 ? null :
                  <TableBody>
                    {products.map((pro) => (
                      <TableRow key={pro._id}>
                        <TableCell style={{ color: "#B1D8B7" }} component="th" scope="row">
                          {pro.name}
                        </TableCell>
                        <TableCell style={{ color: "#B1D8B7" }} align="right">
                          {pro.price}
                        </TableCell>
                        <TableCell style={{ color: "#B1D8B7" }} align="right">
                          {pro.quantity}
                        </TableCell>
                        <TableCell style={{ color: "#B1D8B7" }} align="right">
                          {pro.category}
                        </TableCell>
                        <TableCell style={{ color: "#B1D8B7" }} align="right">{pro.approved}</TableCell>
                        <TableCell style={{ color: "#B1D8B7" }} align="right">
                          <IconButton id={pro._id} onClick={handleEdit} aria-label="Edit">
                            <EditIcon style={{ color: "#B1D8B7" }} />
                          </IconButton>
                        </TableCell>
                        <TableCell style={{ color: "#B1D8B7" }} align="right">
                          <IconButton id={pro._id} onClick={handleDelete} aria-label="delete">
                            <DeleteIcon style={{ color: "#B1D8B7" }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                }
              </Table>
            </Box>
          </div>
        </div>
      </div>

      <Footer color="#022D41" />
    </div>
  );
}
