import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from "classnames";
const uStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
      marginLeft: '50%'
    },
  }));
  function Loading (){
    const clas = uStyles();
    console.log('yes it is');
    return (
      <div style={{ paddingTop: "300px", paddingBottom: "180px"}} className={classNames(clas.root)}>
        <CircularProgress color="secondary" />
    </div>
  );}
  
  export default Loading;