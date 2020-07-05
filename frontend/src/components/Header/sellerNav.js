import React,{useEffect} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
const Token = sessionStorage.getItem('TokenSeller');
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
    const [name, setName]= React.useState("");
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    axios({
        method: 'get',
        url: "https://limitless-lowlands-36879.herokuapp.com/sellers/myinfo",
        headers: {
            'Authorization': 'Bearer '+Token,
        } 

      }).then(res =>{
          console.log(res.data);
          sessionStorage.setItem('TokenSellerID', res.data.sellers._id);
        setName(res.data.sellers.name);
    //    const token = res.data.token;
    //     console.log(token);
    //    sessionStorage.setItem('TokenKey', token);
    //    window.location.href = "/index";
    })
  }, [])
  const handleChange = (event, newValue) => {
    switch(newValue){
        case 0:
            window.location.href="/seller-landing";
            break;
        case 1:
            window.location.href="/seller-products";
            break;

    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor:"#4caf50"}}>
      <Typography style={{marginLeft:"5vw"}}className={classes.title} variant="h6" noWrap>
           {name}
      </Typography>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Add Products" {...a11yProps(0)} />
          <Tab label="See Your Products" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      {/* <TabPanel value={value} index={0}>
        Add New Products
      </TabPanel>
      <TabPanel value={value} index={1}>
        Review Added Products
      </TabPanel> */}

    </div>
  );
}
