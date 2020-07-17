import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Axios from 'axios';
import Cookies from "universal-cookie";

const cookies = new Cookies();

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const getLastDates = (back) => {
  let date = new Date();
  date.setDate(date.getDate() - back);
  let yyyy = date.getFullYear();
  let mm = (date.getMonth() + 1);
  if (mm <= 9)
    mm = "0" + mm;
  let dd = date.getDate();
  if (dd <= 9)
    dd = "0" + dd;

  let finalDate = yyyy + "-" + mm + '-' + dd;
  return finalDate;
}

export default function Deposits(props) {
  const classes = useStyles();
  const [orders, setOrders] = useState({
    orders: "Loading..."
  })
  // console.log(lastDates) ;
  useEffect(() => {
    if (props.orders && orders.orders === "Loading...") {
      setOrders({
        orders: props.orders
      })
    }
  }, [props.orders])
  let total = "Loading..." ;
  if (orders.orders !== "Loading...") {
    total = 0 ;

    // let total = 0 ;
    let today = getLastDates(0) ;
    for (let i = 0; i < orders.orders.length; ++i) {
      if (orders.orders[i].date.split("T")[0] === today) {
        total += orders.orders[i].product.price * orders.orders[i].quantity ; 
      }
    }
    total = total.toFixed(2) ;
    total = "£ " + total ;
  }
  let tempDate = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  let date = monthNames[tempDate.getMonth()] + " " + tempDate.getDate() + "," + tempDate.getFullYear();

  return (
    <React.Fragment>
      <Title>Recent Revenue</Title>
      <Typography component="p" variant="h4">
       {total}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        updated on {date}
      </Typography>
      <div>
        <Link style={{color:"#3f51b5"}} to="/dashboard/orders" >
          View More
        </Link>
      </div>
    </React.Fragment>
  );
}