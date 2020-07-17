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
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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
  // console.log(props.category) ;
  return (
    <Card className={classes.root} style={{ width: "280px", display: "inline-block", margin: "16px" }}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://don16obqbay2c.cloudfront.net/wp-content/uploads/Storefront_Images_C-1481632060.png"
          title={props.category}
        />
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
        <Link to={"/dashboard/categories/" + props.category}>
          <StyledButton2 style={{ width: "160px", marginLeft: "52px" }}>Products</StyledButton2>
        </Link>
        {/* <StyledButton2>PendingProducts</StyledButton2> */}
      </CardActions>
    </Card>
  );
}
