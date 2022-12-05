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
// import classes from "./Product.css" ;
import { Link } from "react-router-dom" ;

const usStylese = makeStyles({
  root : {
    maxWidth: "345px",
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
    minHeight:"340px",
    // height:"auto",
    maxheight: "400px",
}
})

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Product(props) {
  const classes2 = useStyles();
  // console.log(props) ;
  const classes = usStylese() ;
  console.log(props.pageFrom);
  return (
    <Link to={"/seller-product/" + props.id + "/" + props.pageFrom}>
      <Card style={{ width: '19rem'}} className={classes.Outer}>
        <Card className={classes.root} onClick = {props.clicked}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes2.avatar}>
                {props.title[0]}
              </Avatar>
            }
            title={props.title}
            subheader={"£ " + props.price}
          />
          <CardMedia
            className={classes.media}
            // style={{width:"100%"}}
            image={"http://localhost:5000/" + props.image} 
            title={props.title}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
          </CardActions>
        </Card>
      </Card>
    </Link>
  );
}
