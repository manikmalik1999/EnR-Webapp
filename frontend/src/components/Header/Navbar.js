import React,{useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';


import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Tooltip from '@material-ui/core/Tooltip';
//images 
import logo from 'assets/img/EnR-logo.png'
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'relative',
    color:"white",
    display: 'inline',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar(props) {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const {value} = props;
  const [search, setSearch]= useState(value);
  
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleSearch =(e)=>{
    window.location.href="/search/"+ search;
  }
  const HandleEnter =(e)=>{
   
    if(e.keyCode===13){
      window.location.href="/search/"+ search;
    }
  }
  const handleLoginclick =(e)=>{
    window.location.href="/login-page";
  }
  const handleSignupclick =(e)=>{
    window.location.href="/sign-up";
  }
const HandleCart = (e)=>{
  window.location.href="/cart-page"
}
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
      <div className={classes.search}>
                    <InputBase
                    value={search}
                    placeholder="Search for products"
                    onChange={ e =>{setSearch(e.target.value)}}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    onKeyDown={(e)=>HandleEnter(e)}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                  </div>
      </MenuItem>
      <MenuItem onClick={handleSignupclick} >
        <IconButton aria-label="Sign-Up" color="inherit">
            <PersonAddIcon/>
        </IconButton>
        <p>Sign-Up</p>
      </MenuItem>
      <MenuItem onClick={handleLoginclick}>
        <IconButton aria-label="login" color="inherit">
            <LockOpenIcon/>
        </IconButton>
        <p>login</p>
      </MenuItem>
       <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
        <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={HandleCart}>
        <IconButton aria-label="show cart" color="inherit">
          <Badge badgeContent={1} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Shopping Cart</p>
      </MenuItem>

    </Menu>
  );
//className={classes.grow}
  return (
    <div className={classes.grow} >
      <AppBar style={{}} position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
              {/* <MenuIcon/> */}
           <img  style={{height: "7vh", width: "auto"}} src={logo}/>
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            EnR E-Commerce
          </Typography>
          {/* <div className={classes.search}>
          <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
              <IconButton>
              <SearchIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <TextField  style={{}} id="input-with-icon-grid" label="Search" />
          </Grid>
        </Grid>
        </div> */}
          {/* <div className={classes.search}>

            <InputBase
              value={search}
              placeholder="Search for products"
              onChange={ e =>{setSearch(e.target.value)}}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            <div className={classes.searchIcon}>
            <IconButton onClick={handleSearch}>
              <SearchIcon style={{color:"white"}}/>
            </IconButton>
            </div>
          </div> */}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

                 <div className={classes.search}>
                    <InputBase
                    value={search}
                    placeholder="Search for products"
                    onChange={ e =>{setSearch(e.target.value)}}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                  <div className={classes.searchIcon}>
                  <IconButton onClick={handleSearch}>
                    <SearchIcon style={{color:"white"}}/>
                  </IconButton>
                  </div>
                  </div>
            <Button style={{background:"white", marginRight:"1vw", height:"5vh", marginTop:"1vh"}} href="/login-page">
              Login
            </Button>
            <Button style={{background:"white", marginRight:"1vw",height:"5vh",  marginTop:"1vh"}} href="/sign-up">
              Sign-up
            </Button>
          <Tooltip title="Account Info">
          <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            </Tooltip>
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton> */}
            <Tooltip title="Cart">
            <IconButton aria-label="show user's cart" color="inherit" onClick={HandleCart}>
              <Badge badgeContent={1} color="secondary">
              <ShoppingCartIcon/>
              </Badge>
            </IconButton>
            </Tooltip>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}