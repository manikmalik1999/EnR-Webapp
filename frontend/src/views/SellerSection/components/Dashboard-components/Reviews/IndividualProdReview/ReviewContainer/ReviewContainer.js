import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { TextareaAutosize, IconButton } from '@material-ui/core';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import { Rating } from "semantic-ui-react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: TextareaAutosize,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  }
}));

export default function ReviewContainer(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          {/* <Grid item xs={1}>
            <Avatar className={classes.purple}>{props.avatar}</Avatar>
          </Grid> */}.
          <Grid item xs={3} style={{ borderRight: "1px solid lightgrey"}}>
            <h6 style={{display:"inline-block"}}>{props.name}</h6>
            <Rating icon='star' defaultRating={props.value} style={{float:"right"}} maxRating={5} />
            <br />
            <br />
            <p>User Id : {props.id}</p>
          </Grid>
          <Grid item xs={6} style={{ margin: "auto" }}>
            <p style={{fontSize:"14px"}}>{props.message}</p>
          </Grid>
          <Grid item xs={1} style={{ borderLeft: "1px solid lightgrey",margin:"Auto" }}>
            <IconButton onClick={props.clicked} id={props.id}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}