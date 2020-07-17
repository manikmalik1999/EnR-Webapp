import React,{ useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from 'axios';
import Cookies from "universal-cookie" ;
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core";

// import Title from '../../Title';

const cookies = new Cookies() ;

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  let token = cookies.get("Token") ;
  // let category;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [snack, setSnack] = useState({
    show: false,
    message: "",
    color: "lightBlue"
  })

  //snackHandler
  const snackbarClose = (event) => {
    setSnack({
      show: false,
      message: ""
    })
  }
  const postCategoryHandler = (event) => {
    // console.log(category.value);
    const category = event.target.category.value; 
    event.preventDefault();
    event.stopPropagation();
    if( category === "" ){
      setSnack({
        show : true ,
        message : "Enter Category Name First",
        color: "red"
      })
    } else {
      Axios.post("https://limitless-lowlands-36879.herokuapp.com/categories",{
        category : category
      },{
        headers: {
            "Authorization" :"Bearer " + token
        }
      })
        .then(response => {
          if( response.data.message === "Category Added" ){
            setSnack({
              show : true ,
              message : "Category added",
              color : "green"
            })
          } else {
            setSnack({
              show : true ,
              message : "Category addition Failed",
              color: "red"
            })
          }
          window.location.reload(false);
        })
        .catch(err => {
          console.log(err) ;
        })
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snack.show}
        autoHideDuration={4000}
        onClose={snackbarClose}
        bodystyle={{ backgroundColor: 'teal', color: 'coral' }}
        message={<span id="message-id">{snack.message}</span>}

      >
        <SnackbarContent style={{
          backgroundColor: snack.color,
        }}
          action={[
            <button key={"close"} onClick={snackbarClose} style={{ background: "none", border: "none", color: "white" }}>x</button>
          ]}
          message={<span id="client-snackbar">{snack.message}</span>}
        />
      </Snackbar>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Category
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Product Category</DialogTitle>
        <form onSubmit={postCategoryHandler}>
        <DialogContent>
          <DialogContentText>
            To add more category fields to the shop enter the category-name here
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="category"
            label="Name"
            // type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} type="submit" color="primary">
            Add
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}