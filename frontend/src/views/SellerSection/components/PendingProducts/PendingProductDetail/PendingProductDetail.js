import React, { Component } from 'react';
import Aux from "../../../hoc/Auxilliary";
import classes from "./PendingProductDetail.css";
import { Button } from "react-bootstrap";
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { Redirect } from "react-router-dom";
import classescss from "./PendingProductDetail.css";
import { Icon } from 'semantic-ui-react'
import Cookies from "universal-cookie";
import { Dimmer, Loader } from "semantic-ui-react";

const IconExampleDisabled = () => <Icon name='angle left' size="large" />

// import AllProducts from '../../AllProducts/AllProducts';

const cookies = new Cookies();

class PendingProductDetail extends Component {
    state = {
        product: {},
        seller: {},
        loading: true,
        redirectToPendingProducts: false,
        value: "back"
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            axios.get('https://limitless-lowlands-36879.herokuapp.com/products/' + this.props.match.params.id)
                .then(response => {
                    console.log(response);
                    this.setState({
                        product: response.data.product,
                        seller: response.data.product.sellerId,
                        loading: false
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        };
    };
    acceptHandler = () => {
        let token = cookies.get("Token");
        axios.get("https://limitless-lowlands-36879.herokuapp.com/admin/approve/true/" + this.state.product._id, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(res => {
                // console.log("true");
                // console.log(res);
                this.setState({ redirectToPendingProducts: true, value: true });
            })
            .catch(err => {
                console.log(err);
            })
    }
    denyHandler = () => {
        let token = cookies.get("Token");
        axios.get("https://limitless-lowlands-36879.herokuapp.com/admin/approve/false/" + this.state.product._id, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(res => {
                // console.log("false");
                // console.log(this.state.product._id);
                // console.log(res);
                this.setState({ redirectToPendingProducts: true, value: false });
            })
            .catch(err => {
                console.log(err);
            })
    }
    redirectHandler = () => {
        this.setState({ redirectToPendingProducts: true, value: "back" });
    }
    render() {
        let redir = null;
        if (this.state.redirectToPendingProducts) {
            redir = <Redirect to={{
                pathname: "/dashboard/products",
                state: { value: this.state.value }
            }} />
        }
        let loading = null;
        let load = this.state.loading;
        if (load) {
            loading = (
                <Dimmer active inverted style={{ marginLeft: "150px", width: "100%" }}>
                    <Loader size='medium'>Loading</Loader>
                </Dimmer>
            )
        }
        return (
            <Aux>
                {redir}
                {!load ?
                    <Grid container spacing={3} justify="center" className={classescss.All} style={{ border: "2px solid #efefef", boxShadow: "2px 3px 13px #222021", borderRadius: "6px", marginTop: "24px", minHeight: "500px" }}>
                        {/* <Paper className={classes.paper}> */}
                        {/* <Row > */}
                        <Grid item xs={12} lg={12} style={{ borderBottom: "2px solid #efefef", maxHeight: "100px" }}>
                            <div style={{ padding: "12px", paddingLeft: "24px", margin: "auto", cursor: "pointer" }} onClick={this.redirectHandler}>
                                <IconExampleDisabled style={{ margin: "auto", verticalAlign: "center" }} />
                                <p style={{ fontSize: "16px", display: "inline-block", margin: "auto", marginLeft: "12px", verticalAlign: "center" }}>Back to Products</p>
                            </div>
                        </Grid>
                        <Grid container item spacing={2} xs={12} lg={12} style={{borderBottom:"2px solid #efefef"}}>
                            <Grid item lg={4}>
                                <img src={"https://limitless-lowlands-36879.herokuapp.com/" + this.state.product.image} style={{ width: "100%", margin: "auto" }} alt="" className={classes.Image} />
                            </Grid>
                            <Grid item lg={4}>
                                <img src={"https://limitless-lowlands-36879.herokuapp.com/" + this.state.product.image2} style={{ width: "100%", margin: "auto" }} alt="" className={classes.Image} />
                            </Grid>
                            <Grid item lg={4}>
                                <img src={"https://limitless-lowlands-36879.herokuapp.com/" + this.state.product.image3} style={{ width: "100%", margin: "auto" }} alt="" className={classes.Image} />
                            </Grid>
                        </Grid>
                        {/* <Grid item xs={1} sm={1} lg={1} className={classes.VerLine} /> */}
                        <Grid item xs={12} sm={10} lg={10} className={classes.Details} >
                            {/* <Row> */}
                            <Grid container spacing={2} alignItems="center" style={{ height: "100%" }} >
                                <Grid item xs={12} lg={7} style={{ padding: "24px" }}>
                                    <h2 className={classescss.Name}>{this.state.product.name}</h2>
                                    <h4 className={classescss.Cat}>{this.state.product.category}</h4>
                                    <h1 className={classescss.Price}>£ {this.state.product.price}</h1>
                                    <br />
                                    <p className={classescss.Description}>{this.state.product.description}</p>
                                    <p>Quantity : {this.state.product.quantity} pcs</p>
                                    <br />
                                    <p className={classescss.Description}>Seller Id : {this.state.seller._id}</p>
                                    <p className={classescss.Description}>{this.state.seller.name}</p>
                                </Grid>
                                <Grid item xs={12} lg={5}>
                                    <Button vaiant="success" onClick={this.acceptHandler} className={classes.Btn}>Accept Request</Button>
                                    <Button variant="danger" onClick={this.denyHandler} className={classes.Btn}>Deny Request</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    :
                    loading
                }
            </Aux>
        )
    };
};

export default PendingProductDetail;