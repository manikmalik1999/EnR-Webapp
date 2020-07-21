import React, { Component } from 'react';
import Aux from "../../../hoc/Auxilliary";
import classes from "./PendingProductDetail.css";
import { Button } from "react-bootstrap";
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { Redirect } from "react-router-dom";
// import classescss from "./PendingProductDetail.css";
import { Icon } from 'semantic-ui-react'
import Cookies from "universal-cookie";
import { Dimmer, Loader } from "semantic-ui-react";
import { makeStyles } from '@material-ui/core/styles';


const IconExampleDisabled = () => <Icon name='angle left' size="large" />

const usssStyles = makeStyles({

    Img: {
        width: "100%",
        height: "auto",
    },
    Image: {
        width: "22rem",
        height: "28rem",
    },
    Details: {
        alignItems: "center",
        marginTop: "auto",
        marginBottom: "auto",
        verticalAlign: "middle",
        fontFamily: "'Lato', sans-serif",
    },
    VerLine: {
        marginLeft: "50px",
        borderLeft: "2px solid #efefef",
    },
    Btn: {
        margin: "20px auto",
        width: "100%"
    },
    // All : {
    //     fontFamily:"Raleway",
    // },
    Name: {
        color: "#515151",
        fontWeight: "300",
        paddingTop: "15px",
        margin: "0",
        fontSize: "30px",
        fontWeight: "300",
    },
    Cat: {
        margin: "0",
        color: "#727272",
        textTransform: "uppercase",
        fontWeight: "500",
        fontSize: "12px"
    },
    Price: {
        color: "#515151",
        fontWeight: "300",
        paddingTop: "15px",
        margin: "0",
        fontSize: "30px",
        fontWeight: "300",
    },
    Desc: {
        fontSize: "12px",
        lineHeight: "20px",
        color: '#727272',
        padding: "20px 0",
        margin: "0",
    },
    Btn: {
        outline: "0",
        border: "0",
        background: "none",
        border: "1px solid #d9d9d9",
        padding: "8px 0px",
        marginBottom: "30px",
        color: "#515151",
        textTransform: "uppercase",
        width: "125px",
        fontFamily: "inherit",
        marginRight: "5px",
        transition: "all 0.3s ease",
        fontWeight: "500",
    },
});

// import AllProducts from '../../AllProducts/AllProducts';

const cookies = new Cookies();
const sellerToken = sessionStorage.getItem("TokenSeller");

class PendingProductDetail extends Component {
    state = {
        product: {},
        seller: {},
        loading: true,
        redirectToPendingProducts: false,
        value: "back"
    }

    componentDidMount() {
        if (this.props.id) {
            axios.get('https://limitless-lowlands-36879.herokuapp.com/products/' + this.props.id)
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
    editHandler = () => {
        window.location.href = "/seller-edit/" + this.props.id;
        // let token = cookies.get("Token");
        // axios.get("https://limitless-lowlands-36879.herokuapp.com/admin/approve/true/" + this.state.product._id, {
        //     headers: {
        //         "Authorization": "Bearer " + token
        //     }
        // })
        //     .then(res => {
        //         // console.log("true");
        //         // console.log(res);
        //         this.setState({ redirectToPendingProducts: true, value: true });
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
    }
    // denyHandler = () => {
    //     let token = cookies.get("Token");
    //     axios.get("https://limitless-lowlands-36879.herokuapp.com/admin/approve/false/" + this.state.product._id, {
    //         headers: {
    //             "Authorization": "Bearer " + token
    //         }
    //     })
    //         .then(res => {
    //             // console.log("false");
    //             // console.log(this.state.product._id);
    //             // console.log(res);
    //             this.setState({ redirectToPendingProducts: true, value: false });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }
    redirectHandler = () => {
        this.setState({ redirectToPendingProducts: true, value: "back" });
    }
    deleteHandler = () => {
        axios.delete("https://limitless-lowlands-36879.herokuapp.com/products/" + this.state.product._id, {
            headers: {
                "Authorization": "Bearer " + sellerToken
            }
        })
            .then(res => {
                // console.log(res);
                this.setState({ redirectToOutOfStockProducts: true, value: false });
                window.location.href = "/seller-all-products";
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        // const classescss = usssStyles() ;
        let redir = null;
        if (this.state.redirectToPendingProducts) {
            redir = <Redirect to={{
                pathname: "/seller-all-products",
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
        console.log(this.props.pageFrom);
        let buttonCode;
        if(this.props.pageFrom === 'approved'){
            buttonCode = (<Grid item xs={12} lg={5}>
                            <Button variant="success" onClick={this.editHandler} style={{
                                margin: "20px auto",
                                width: "100%"
                            }}>Edit Product</Button>
                        </Grid>)
        }
        else{
            buttonCode = (<Grid item xs={12} lg={5}>
                            <Button variant="success" onClick={this.editHandler} style={{
                                margin: "20px auto",
                                width: "100%"
                            }}>Edit Product</Button>
                            <Button variant="danger" onClick={this.deleteHandler} style={{
                                margin: "20px auto",
                                width: "100%"
                            }}>Delete Product</Button>
                        </Grid>)
        }
        return (
            <Aux>
                {redir}
                {!load ?
                    <Grid container spacing={3} justify="center" style={{ border: "2px solid #efefef", boxShadow: "2px 3px 13px #222021", borderRadius: "6px", marginTop: "24px", minHeight: "500px" }}>
                        {/* <Paper className={classes.paper}> */}
                        {/* <Row > */}
                        <Grid item xs={12} lg={12} style={{ borderBottom: "2px solid #efefef", maxHeight: "100px" }}>
                            <div style={{ padding: "12px", paddingLeft: "24px", margin: "auto", cursor: "pointer" }} onClick={this.redirectHandler}>
                                <IconExampleDisabled style={{ margin: "auto", verticalAlign: "center" }} />
                                <p style={{ fontSize: "16px", display: "inline-block", margin: "auto", marginLeft: "12px", verticalAlign: "center" }}>Back to Products</p>
                            </div>
                        </Grid>
                        <Grid container item spacing={2} xs={12} lg={12} style={{ borderBottom: "2px solid #efefef" }}>
                            <Grid item lg={4}>
                                <img src={"https://limitless-lowlands-36879.herokuapp.com/" + this.state.product.image} style={{
                                    width: "100%", margin: "auto",
                                    height: "28rem",
                                }} alt="" />
                            </Grid>
                            <Grid item lg={4}>
                                <img src={"https://limitless-lowlands-36879.herokuapp.com/" + this.state.product.image2} style={{
                                    width: "100%", margin: "auto",
                                    height: "28rem",
                                }} alt="" />
                            </Grid>
                            <Grid item lg={4}>
                                <img src={"https://limitless-lowlands-36879.herokuapp.com/" + this.state.product.image3} style={{
                                    width: "100%", margin: "auto",
                                    height: "28rem",
                                }} alt="" />
                            </Grid>
                        </Grid>
                        {/* <Grid item xs={1} sm={1} lg={1} className={classes.VerLine} /> */}
                        <Grid item xs={12} sm={10} lg={10} className={classes.Details} >
                            {/* <Row> */}
                            <Grid container spacing={2} alignItems="center" style={{ height: "100%" }} >
                                <Grid item xs={12} lg={7} style={{ padding: "24px" }}>
                                    <h2 style={{
                                        color: "#515151",
                                        fontWeight: "300",
                                        paddingTop: "15px",
                                        margin: "0",
                                        fontSize: "30px",
                                        fontWeight: "300",
                                    }}>{this.state.product.name}</h2>
                                    <h4 style={{
                                        margin: "0",
                                        color: "#727272",
                                        textTransform: "uppercase",
                                        fontWeight: "500",
                                        fontSize: "12px"
                                    }}>{this.state.product.category}</h4>
                                    <h1 style={{
                                        color: "#515151",
                                        fontWeight: "300",
                                        paddingTop: "15px",
                                        margin: "0",
                                        fontSize: "30px",
                                        fontWeight: "300",
                                    }}>£ {this.state.product.price}</h1>
                                    <br />
                                    <p style={{
                                            fontSize: "12px",
                                            lineHeight: "20px",
                                            color: '#727272',
                                            padding: "20px 0",
                                            margin: "0",
                                    }}>{this.state.product.description}</p>
                                    <p>Quantity : {this.state.product.quantity} pcs</p>
                                    <br />
                                    <p style={{
                                            fontSize: "12px",
                                            lineHeight: "20px",
                                            color: '#727272',
                                            padding: "20px 0",
                                            margin: "0",
                                    }}>Seller Id : {this.state.seller._id}</p>
                                    <p style={{
                                            fontSize: "12px",
                                            lineHeight: "20px",
                                            color: '#727272',
                                            padding: "20px 0",
                                            margin: "0",
                                    }}>{this.state.seller.name}</p>
                                </Grid>
                                {/* buttons */}
                                {buttonCode}
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
