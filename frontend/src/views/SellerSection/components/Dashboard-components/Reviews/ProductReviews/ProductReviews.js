import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import Aux from '../../../hoc/Auxilliary';
import classes from "./ProductReviews.css";
import RateReviewIcon from '@material-ui/icons/RateReview';
import { Link } from "react-router-dom";
import elliot from "../../../../assets/img/elliot.jpg";


const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ProductReviews(props) {
  const classes2 = useStyles();
  return (
      <Link to={"/dashboard/reviews/" + props.id}>
        <Card style={{ width: '19rem' }} className={classes.Outer}>
          <Card className={classes.root} onClick={props.clicked}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes2.avatar}>
                  {props.title[0]}
                </Avatar>
              }
              title={props.title}
              subheader={"Rs. " + props.price}
            />
            <CardMedia
              className={classes.media}
              image={elliot}
              // "https://limitless-lowlands-36879.herokuapp.com/" + props.image.replace("\\","/")} 
              title={props.title}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.description}
              </Typography>
            </CardContent>
            <CardActions>
              {/* <IconButton aria-label="All reviews"> */}
              <RateReviewIcon style={{ marginLeft: "70px" }} />
              {/* </IconButton> */}
              <p>All Reviews</p>
              {/* <Typography variant="body" color="primary"> All Reviews</Typography> */}
              {/* <IconButton aria-label="share">
              <ShareIcon />
            </IconButton> */}
            </CardActions>
          </Card>
        </Card>
      </Link>
  );
}
