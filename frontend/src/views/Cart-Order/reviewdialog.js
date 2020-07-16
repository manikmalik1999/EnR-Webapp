import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import Star from '@material-ui/icons/Star';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
      width: 200,
      display: 'flex',
      alignItems: 'center',
    },
  });

const labels = {
    1: 'Very-Dissatisfied',
    2: 'Dissatisfied',
    3: 'Satisfied',
    4: 'Very-Satisfied',
    5: 'Must-Buy',
  };

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(3);
  const [hover, setHover] = React.useState(-1);
  const [comments,setComments] = React.useState("");
  const classes = useStyles();
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit= (e)=>{
    axios({
      method: 'post',
      url: "https://limitless-lowlands-36879.herokuapp.com/reviews",
      headers: {
          'Authorization': 'Bearer '+props.token,
      },
      data: {
          value: value,
          comment: comments,
          productId: e
      }
    }).then(res=>{
      alert(res.data.message);
      setOpen(false);
    });
    setOpen(false);
    setComments("");
    setHover(-1);
    setValue(3);
  };

  return (
    <div>
      <Button style={{ backgroundColor: "#00897b", display: "inline", marginLeft: "20vw" }} variant="contained" color="primary" onClick={handleClickOpen}>
        Add Review
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Review the Product</DialogTitle>
        <DialogContent>
        <div className={classes.root}>
        <Rating
            style={{fontSize : "60"}}
            name="hover-feedback"
            icon={<Star fontSize="large"/>}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
                setHover(newHover);
            }}
        />
        {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
        </div>
          <br/>
          <br/>
          <DialogContentText>
            Do take out some time to give your precious reviews
          </DialogContentText>
          <TextField value={comments} id="standard-basic" label="Your views" fullWidth onChange={(e)=>{setComments(e.target.value)}}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Some Other time
          </Button>
          <Button onClick={() => handleSubmit(props.id)} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
