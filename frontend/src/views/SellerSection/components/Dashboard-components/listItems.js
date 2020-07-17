import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
// import BarChartIcon from '@material-ui/icons/BarChart';
// import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CategoryIcon from '@material-ui/icons/Category';
import { Link } from 'react-router-dom';
import Cookies from "universal-cookie";
import Badge from '@material-ui/core/Badge';


const cookies = new Cookies();


export const mainListItems = (
  <div>
    <Link to="/seller-landing">
      <ListItem style={{ color: "white", fontWeight: "bold" }} button>
        <Tooltip title="Dashboard" placement="right-start">
          <ListItemIcon>
            <DashboardIcon style={{ color: "white" }} />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Link to="/seller-add-product">
      <ListItem style={{ color: "white", fontWeight: "bold" }} button>
        <Tooltip title="Add Product" placement="right-start">
          <ListItemIcon>
            <DashboardIcon style={{ color: "white" }} />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Add Product" />
      </ListItem>
    </Link>
    <Link to="/seller-products">
      <ListItem style={{ color: "white", fontWeight: "bold" }} button>
        <Tooltip title="Products" placement="right-start">
          <ListItemIcon>
            {/* <Badge badgeContent={4} color="secondary"> */}
              <AddShoppingCartIcon style={{ color: "white" }} />
            {/* </Badge> */}
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Products" />
      </ListItem>
    </Link>
    <Link to="/seller-all-products">
      <ListItem style={{ color: "white", fontWeight: "bold" }} button>
        <Tooltip title="All Products" placement="right-start">
          <ListItemIcon>
              <AddShoppingCartIcon style={{ color: "white" }} />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="All Products" />
      </ListItem>
    </Link>
    {/* <Link to="/seller-categories">
      <ListItem style={{ color: "white", fontWeight: "bold" }} button>
        <Tooltip title="Categories" placement="right-start">
          <ListItemIcon>
            <CategoryIcon style={{ color: "white" }} />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Categories" />
      </ListItem>
    </Link> */}
    {/* <Link to="/dashboard/products">
      <ListItem style={{ color: "white", fontWeight: "bold" }} button>
        <Tooltip title="Categories" placement="right-start">
          <ListItemIcon>
            <CategoryIcon style={{ color: "white" }} />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Products" />
      </ListItem>
    </Link> */}
    <Link to="/seller-product-reviews">
      <ListItem style={{ color: "white", fontWeight: "bold" }} button>
        <Tooltip title="Product Reviews" placement="right-start">
          <ListItemIcon>
            <AssignmentIcon style={{ color: "white" }} />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Product Reviews" />
      </ListItem>
    </Link>
    {/* <Link to="/dashboard/sellers">
      <ListItem style={{ color: "white", fontWeight: "bold" }} button>
        <Tooltip title="Sellers" placement="right-start">
          <ListItemIcon>
            <PeopleIcon style={{ color: "white" }} />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Sellers" />
      </ListItem>
    </Link> */}
    <Link to="/seller-orders">
      <ListItem style={{ color: "white", fontWeight: "bold" }} button>
        <Tooltip title="Orders" placement="right-start">
          <ListItemIcon>
            <ShoppingCartIcon style={{ color: "white" }} />
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Orders" />
      </ListItem>
    </Link>
  </div>

);

export const secondaryListItems = (
  <div>
    <ListItem style={{ color: "white", fontWeight: "bold" }} button >
      <Tooltip title="Logout" placement="right-start">
        <ListItemIcon>
          <ExitToAppIcon style={{ color: "white" }} />
        </ListItemIcon>
      </Tooltip>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
)
