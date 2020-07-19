import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classes from './Category.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import categoryImage from '../../../../../../assets/img/category.png'

const usStylese = makeStyles({
  root : {
    maxWidth: "345",
},

Outer : {
    border: "none !important",
    borderRadius: "6px",
    fontFamily: "'Lato', sans-serif",
    display: "inline-block",
    paddingTop: "8px" ,
    /* padding-bottom: 8px, */
    margin: "8px",
},
Title : {
    fontWeight: "700",
    fontSize: "24px" ,
},
Desc : {
    fontSize: "16px" ,
},
Price : {
    fontSize: "18px",
    fontWeight: "600",
},
// Outer:hover : {
//     cursor: "pointer",
//     transform: "translateY(-2px)" ,
//     boxShadow: "1px 2px 15px rgb(177, 174, 174)" ,
//     transition: "all 0.3s",
// } ,
media : {
    paddingTop: "56.25%",
    margin: "auto",
    width: "auto",
    height: "140",
}
})

const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 40,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

const StyledButton2 = withStyles({
  root: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 40,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

export default function Category(props) {
  const classes = usStylese() ;
  // console.log(props.category) ;
  return (
    <Card className={classes.root} style={{ width: "280px", display: "inline-block", margin: "16px" }}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://don16obqbay2c.cloudfront.net/wp-content/uploads/Storefront_Images_C-1481632060.png"
          title={props.category}
        />
        {/* <img src={categoryImage} height="240" width="320"/> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" color="primary">
            {props.category}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Sale is extremely good in this section
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
            Sales
          </Button> */}
        {/* <Button size="small" color="success">
            Products
          </Button> */}
        <Link to={"/seller-categories/" + props.category}>
          <StyledButton2 style={{ width: "160px", marginLeft: "52px" }}>Products</StyledButton2>
        </Link>
        {/* <StyledButton2>PendingProducts</StyledButton2> */}
      </CardActions>
    </Card>
  );
}
