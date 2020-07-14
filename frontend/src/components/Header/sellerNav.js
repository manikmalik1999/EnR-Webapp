import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom" ;

const Token = sessionStorage.getItem('TokenSeller');
// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }


// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

export default function SimpleTabs() {
  const [name, setName] = React.useState("Loading...");
  // const classes = useStyles();
  const [value, setValue] = React.useState("");
  const [activ, setActiv] = useState(0);
  let val = 0 ;
  let url = window.location.href ;
  url = url.split("/")[3] ;
  console.log(url) ;
  if(url === "seller-landing"){
    // setActiv(0);
    val=0;
  } else if(url === "seller-products" || url === "seller-edit"){
    // setActiv(1) ;
    val=1 ;
  } else {
    // setActiv(2) ;
    val=2 ;
  }
  useEffect(() => {
    axios({
      method: 'get',
      url: "https://limitless-lowlands-36879.herokuapp.comsellers/myinfo",
      headers: {
        'Authorization': 'Bearer ' + Token,
      }
    }).then(res => {
      console.log(res.data);
      setName("Hi, " + res.data.sellers.name);
      sessionStorage.setItem('TokenSellerID', res.data.sellers._id);
    })
  }, [])

  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        setActiv(0) ;
        window.location.href = "/seller-landing";
        break;
      case 1:
        setActiv(1) ;
        window.location.href = "/seller-products";
        break;
      case 2 :
        setActiv(2) ;
        localStorage.removeItem("TokenSeller") ;
        window.location.href = "/";
        break;
    }
  };
  console.log(val) ;
  return (
    <div >
      <AppBar position="static" style={{ backgroundColor: "#022D41" }}>
        <h4 style={{ color: "white", marginRight: "24px", marginLeft: "auto", display: "inline-block" }}>
          {name}
        </h4>
        <Tabs value={val} onChange={handleChange} aria-label="simple tabs example" style={{ margin: "auto" }}>
          { val === 0 ? 
          <Tab label="Add Products" style={{borderBottom:"5px solid grey"}} /> :
          <Tab label="Add Products" /> }
          { val === 1 ?
          <Tab label="See Your Products" style={{borderBottom:"5px solid grey"}} /> :
          <Tab label="See Your Products" /> }
          { val === 2 ? 
          <Tab label="Logout" style={{borderBottom:"5px solid grey"}} /> :
          <Tab label="Logout" /> }
        </Tabs>
      </AppBar>
    </div>
  );
}

// FEE715FF
// {...a11yProps(1)}