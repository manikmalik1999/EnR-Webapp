import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";
import { Dropdown } from 'semantic-ui-react';
import Axios from "axios";

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(4n+3)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:nth-of-type(4n+4)': {
      backgroundColor: theme.palette.action.hover,
    }
  },
}))(TableRow);

function setDate(date) {
  let year = date.slice(0, 4);
  let month = date.slice(5, 7);
  let _date = date.slice(8, 10);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return (parseInt(_date) + " " + monthNames[parseInt(month) - 1].slice(0, 3) + " , " + year);
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const usStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(id, date, product, customer, category, quantity, price, amount, email, pId, cId, oId) {
  return {
    id,
    date,
    product,
    customer,
    quantity,
    amount,
    history: [
      { id: id + "xyzz", email: email, price: price, category: category, pId: pId, cId: cId, oId: oId }
    ]
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <StyledTableRow className={classes.root}>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell>{row.product}</TableCell>
        <TableCell>{row.customer}</TableCell>
        <TableCell>{row.quantity}</TableCell>
        <TableCell>£ {row.amount}</TableCell>
        <TableCell style={{ float: "right" }}>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </StyledTableRow>
      <StyledTableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <p style={{ fontWeight: "600", textAlign: "center", fontSize: "16px" }} >Details</p>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Price/item</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Customer Email</TableCell>
                    <TableCell align="right">Product ID</TableCell>
                    <TableCell align="right">Customer ID</TableCell>
                    <TableCell align="right">Order ID</TableCell>
                  </TableRow>

                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell component="th" scope="row">
                        £  {historyRow.price}
                      </TableCell>
                      <TableCell>{historyRow.category}</TableCell>
                      <TableCell>{historyRow.email}</TableCell>
                      <TableCell align="right">{historyRow.pId}</TableCell>
                      <TableCell align="right">{historyRow.cId}</TableCell>
                      <TableCell align="right">{historyRow.oId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

const formatDate = (date) => {
  let dd = date.slice(0, 2);
  let yyyy = date.slice(9, 13);
  let mm = date.slice(3, 6);
  return (yyyy + "-" + mm + "-" + dd);
}

export default function Orders(props) {
  const [category, setCategory] = useState({
    category: "all"
  })
  const [categories, setCategories] = useState({
    cat: []
  })

  const handleChange = (event, { name, value }) => {
    setCategory({
      category: value
    })
  }
  const handleDateFrom = (event) => {
    console.log(event.target.value);
    setFrom(event.target.value);
  }
  const handleDateTo = (event) => {
    setTo(event.target.value);
  }
  let categoryOptions = [];
  const all = {
    key: "abcxyz",
    value: "all",
    text: "All"
  };
  if (categories.cat !== []) {
    let others = categories.cat.map(category => {
      return {
        key: category._id,
        value: category.category,
        text: category.category
      }
    });
    categoryOptions = [all, ...others]
  }
  useEffect(() => {
    Axios.get("https://limitless-lowlands-36879.herokuapp.com/categories")
      .then(response => {
        setCategories({
          cat: response.data.categories
        })
      })
      .catch(err => {
        console.log(err);
      })
  }, []);
  const classs = usStyles();
  const classes = useStyles();
  const [orders, setOrders] = useState({
    orders: "Loading..."
  })
  const [loading, setLoading] = useState(true);
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  const [from, setFrom] = useState("2020-01-01");
  const [to, setTo] = useState(today);
  let ordersOnly = false;
  useEffect(() => {
    if (props.orders && orders.orders === "Loading...") {
      setOrders({
        orders: props.orders
      });
      setLoading(false);
    }
  }, [props.orders])
  let data = [createData("abcd", "Loading...", "Loading...", "Loading...", "Loading...", "Loading...", "Loading...", "Loading...", "Loading...", "Loading...", "Loading...", "Loading...")];
  let seeMore = false;
  if (orders.orders !== "Loading...") {
    data = orders.orders.map((order, index) => {
      return createData(index, setDate(order.date.split("T")[0]), order.product.name, order.userId.name, order.product.category, order.quantity, order.product.price, order.quantity * order.product.price,
        order.userId.email, order.product._id, order.userId._id, order._id)
    })
    data.reverse();
    if (props.onlyOrders) {
      ordersOnly = props.onlyOrders
    }
    if (data.length > 6 && !ordersOnly) {
      data = data.slice(0, 6);
      seeMore = true;
    }
  }

  data = data.map((row) => {
    if (category.category === "all" || (row.history[0].category.toLowerCase() === category.category.toLowerCase())) {
      let fromDate = new Date(from);
      let toDate = new Date(to);
      let orderDate = formatDate(row.date);
      orderDate = new Date(orderDate);
      orderDate.setDate(orderDate.getDate() + 1);
      if (fromDate <= orderDate && orderDate < toDate) {
        return <Row key={row.id} row={row} />
      }
    }
  }
  )
  let finalData = [];
  for (let i = 0; i < data.length; ++i) {
    if (data[i]) {
      finalData.push(data[i]);
    }
  }
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      {!(seeMore && !ordersOnly) && !loading &&
        <Grid container spacing={3} alignItems="center" justify="space-between" style={{ marginBottom: "12px" }}	>
          <Grid item lg={5} >
            <Dropdown
              placeholder='Select Category'
              fluid
              search
              selection
              defaultValue={category.category}
              onChange={handleChange}
              options={categoryOptions}
            />
          </Grid>
          <Grid item lg={2} />
          <Grid item lg={5}>
            <form className={classs.container} noValidate>
              <TextField
                id="from"
                label="From"
                type="date"
                defaultValue={from}
                className={classs.textField}
                onChange={handleDateFrom}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="to"
                label="To"
                type="date"
                defaultValue={to}
                onChange={handleDateTo}
                className={classs.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </Grid>
        </Grid>
      }
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Sale Amount</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {finalData.length > 0 ?
            finalData :
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell align="center">No Particulars Present Here</TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          }
          {/* {data.map((row) => {
            if (category.category === "all" || (row.history[0].category.toLowerCase() === category.category.toLowerCase())) {
              let fromDate = new Date(from) ;
              let toDate = new Date(to) ;
              let orderDate = formatDate(row.date) ;
              orderDate = new Date(orderDate) ;
              orderDate.setDate(orderDate.getDate() + 1) ;
              if( fromDate <= orderDate && orderDate < toDate  ){
                return <Row key={row.id} row={row} />
              }
            }
          }
          )} */}
        </TableBody>
      </Table>
      {seeMore && !ordersOnly &&
        <div className={classes.seeMore}>
          <Link style={{ color: "#3f51b5" }} to="/dashboard/orders">
            See more Orders / Details
          </Link>
        </div>
      }
    </React.Fragment>
  );
}