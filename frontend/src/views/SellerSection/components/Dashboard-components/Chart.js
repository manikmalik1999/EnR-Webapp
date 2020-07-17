import React, { useState, useEffect } from 'react';
// import "../../../node_modules/semantic-ui-css/semantic.min.css"

import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Grid } from "@material-ui/core";
import { Dropdown } from 'semantic-ui-react';
import Axios from 'axios';


Date.prototype.getWeek = function () {
  var target = new Date(this.valueOf());
  var dayNr = (this.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  var firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target) / 604800000);
}


function createData(time, amount) {
  return { time: time, amount: amount };
}


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
const getLastMonth = () => {
  let date = new Date();
  let mm = (date.getMonth() + 1);
  return mm;
}

function setDate(date) {
  let month = date.slice(5, 7);
  let _date = date.slice(8, 10);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return (parseInt(_date) + " " + monthNames[parseInt(month) - 1].slice(0, 3));
}
function setMonth(month) {
  let date = new Date();
  let yyyy = date.getFullYear();
  let mm = (date.getMonth() + 1);
  if (parseInt(month) > parseInt(mm)) {
    yyyy = parseInt(yyyy) - 1;
  }
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return (monthNames[parseInt(month) - 1].slice(0, 3) + " " + yyyy);
}

function setWeek(week) {
  return ( "week " + week ) ;
}

const timeFilters = [
  { key: 'fkdjf', value: 'pday', text: 'Sales per Day' },
  { key: 'sdigjhd', value: 'pweek', text: 'Sales per Week' },
  { key: 'dfijd', value: 'pmonth', text: 'Sales per Month' }
]

export default function Chart(props) {
  const theme = useTheme();
  const [orders, setOrders] = useState({
    orders: "Loading..."
  })
  const [timeFilter, setTimeFilter] = useState("pday")
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
  const handleFilterChange = (event, { name, value }) => {
    setTimeFilter(value);
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


  const lastDates = [];
  const lastWeeks = [];
  const lastMonths = [];
  if (timeFilter === 'pday') {
    for (let back = 9; back >= 0; --back) {
      lastDates.push(getLastDates(back));
    }
  } else if (timeFilter === "pweek") {
    let date = new Date() ;
    let yyyy = date.getFullYear() ;
    let mm = date.getMonth()+1 ;
    let dd = date.getDate() ;
    date.setFullYear(yyyy,mm,dd-3)
    let currentWeek = date.getWeek()-4 ;
    for (let back = 9; back >= 0; --back) {
      let week = (53 + currentWeek - back) % 53;
      if (week === 0){
        week = 53;
      }
      lastWeeks.push(week.toString());
    }
  } else {
    let currentMonth = getLastMonth();
    for (let back = 9; back >= 0; --back) {
      let month = (12 + currentMonth - back) % 12;
      if (month === 0)
        month = 12;
      if (month < 9) {
        month = "0" + month;
      }
      lastMonths.push(month.toString());
    }
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

  useEffect(() => {
    if (props.orders && orders.orders === "Loading...") {
      setOrders({
        orders: props.orders
      })
    }
  }, [props.orders]);

  let data = [];
  if (timeFilter === "pday") {
    data = lastDates.map(date => {
      return createData(date, 0);
    })
  } else if (timeFilter === "pweek") {
    data = lastWeeks.map(week => {
      return createData(week,0) ;
    })
  } else {
    data = lastMonths.map(month => {
      return createData(month, 0);
    })
  }

  if (orders.orders !== "Loading...") {
    if (timeFilter === "pday") {
      // console.log(orders.orders[0]) ; 
      for (let i = 0; i < orders.orders.length; ++i) {
        for (let j = 0; j < 10; j = j + 1) {
          if (orders.orders[i].date.split("T")[0] === data[j].time && (category.category === 'all' || orders.orders[i].product.category === category.category)) {
            data[j].amount += orders.orders[i].product.price * orders.orders[i].quantity;
            data[j].amount = Math.floor(data[j].amount * 100) / 100;
          }
        }
      }
      for (let i = 0; i < 10; ++i) {
        data[i] = createData(setDate(data[i].time), data[i].amount)
      }
    }
    else if (timeFilter === "pmonth") {
      for (let i = 0; i < orders.orders.length; ++i) {
        for (let j = 0; j < 10; j = j + 1) {
          if (orders.orders[i].date.split("T")[0].slice(5, 7) === data[j].time && (category.category === 'all' || orders.orders[i].product.category === category.category)) {
            data[j].amount += orders.orders[i].product.price * orders.orders[i].quantity;
            data[j].amount = Math.floor(data[j].amount * 100) / 100;
          }
        }
      }
      for (let i = 0; i < 10; ++i) {
        data[i] = createData(setMonth(data[i].time), data[i].amount)
      }
    } else {
      let date = new Date() ;
      for (let i = 0; i < orders.orders.length; ++i) {
        let yyyy = orders.orders[i].date.split("T")[0].slice(0,4);
        let mm = orders.orders[i].date.split("T")[0].slice(5,7);
        let dd = orders.orders[i].date.split("T")[0].slice(8,10);
        yyyy = parseInt(yyyy) ;
        mm = parseInt(mm) ;
        dd = parseInt(dd) ;
        date.setFullYear(yyyy,mm,dd-3) ;
        for (let j = 0; j < 10; j = j + 1) {
          if ( (date.getWeek()-4).toString() === data[j].time.toString() && (category.category === 'all' || orders.orders[i].product.category === category.category)) {
            data[j].amount += orders.orders[i].product.price * orders.orders[i].quantity;
            data[j].amount = Math.floor(data[j].amount * 100) / 100;
          }
        }
      }
      for (let i = 0; i < 10; ++i) {
        data[i] = createData(setWeek(data[i].time), data[i].amount)
      }
    }
  }
  return (
    <React.Fragment>
      <Grid container spacing={3} justify="center" >
        <Grid item lg={3} sm={4} xs={10}>
          {/* <Title>Sales per Day</Title> */}
          <Dropdown
            placeholder='Select Sales Filter'
            fluid
            search
            selection
            defaultValue={timeFilter}
            onChange={handleFilterChange}
            options={timeFilters}
          />
        </Grid>
        <Grid item lg={6} sm={4} xs={10} >
        </Grid>
        <Grid item lg={3} sm={4} xs={10}>
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
      </Grid>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Sales (£)
            </Label>
          </YAxis>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="amount" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}