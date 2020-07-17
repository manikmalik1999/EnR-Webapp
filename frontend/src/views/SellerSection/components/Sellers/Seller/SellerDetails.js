import React, { useState, useEffect} from 'react';
import { Grid } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import PendingProducts from '../../PendingProducts/PendingProducts';
import Axios from "axios" ;
import elliot from "../../../assets/img/elliot.jpg";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));
const usStyles = makeStyles((theme) => ({
    root: {
        color:"green",
        '& > *': {
            margin: theme.spacing(1),
        },
    }
}));


function SellerDetails(props) {
    // console.log(props);
    const [seller,setSeller] = useState({
        name:"Loading...",
        email : "Loading...",
        desc : "Loading..." 
    })
    const [loading,setLoading] = useState({
        loading : true 
    })
    useEffect(() => {
        if( props && props.match && props.match.params && props.match.params.name ){
            setSeller({
                name : props.match.params.name,
                email : props.match.params.email,
                desc : "This is some Description about Seller"
            })
            setLoading({
                loading : false 
            })
        }
    },[props])
    // const im1 = "https://react.semantic-ui.com/images/avatar/large/elliot.jpg";
    const classes = useStyles() ;
    const active = usStyles() ;
    let name="Loading...", email="Loading...",desc="Loading..." ;
    if( !loading.loading ){
        // console.log("selelrsfvs") ;
        name = seller.name;
        email = seller.email ;
        desc = seller.desc ;
    }
    return (
        <div>
            <p style={{ marginBottom: "18px",textAlign:"center",fontSize:"24px" }}>Seller Details</p>
            <Grid container spacing={4} alignItems="center" style={{marginBottom:"24px"}} >
                <Grid item lg={2} />
                <Grid item lg={3} >
                    <img src={elliot} style={{ maxHeight: "280px",borderRadius:"6px" }} />
                </Grid>
                <Grid item lg={2} />
                <Grid item lg={5} style={{ height: "100%" }}>
                    <h2>{name}</h2>
                    <p style={{ marginBottom: "18px" }}>{desc}</p>
                    <h6><i>{email}</i></h6>
                </Grid>
            </Grid>
            <PendingProducts sellerId = {props.match.params.id}/>
        </div>
    )
}

export default SellerDetails;
