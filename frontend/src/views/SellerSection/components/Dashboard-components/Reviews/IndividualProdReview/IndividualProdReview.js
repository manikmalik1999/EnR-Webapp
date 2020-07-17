import React, { Component } from 'react';
import Aux from "../../../../hoc/Auxilliary";
import classes from "./IndividualProdReview.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Redirect } from "react-router-dom";
import ReviewContainer from './ReviewContainer/ReviewContainer';
import { Typography } from '@material-ui/core';
import Cookies from 'universal-cookie';
import { Dimmer, Loader } from "semantic-ui-react";

const cookies = new Cookies();

class IndividualProdReview extends Component {
    state = {
        product: {},
        reviews: [],
        loading: true,
        redirectToPendingProducts: false
    }

    reviewDeleteHandler = (id) => {
        // console.log(id);
        const token = cookies.get("Token");
        // console.log(token);
        axios.delete('https://limitless-lowlands-36879.herokuapp.com/reviews/' + id, {
            headers: {
                "Authorization": "Bearer " + token
            },
            data: {
                source: null
            }
        })
            .then(response => {
                window.location.reload() ;
                // console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        // console.log("indidef : " + this.props.id);
        // console.log(this.props) ;
        if (this.props.match.params.id) {
            axios.get('https://limitless-lowlands-36879.herokuapp.com/products/' + this.props.match.params.id)
                .then(response => {
                    // console.log(response.data.product);
                    this.setState({ product: response.data.product });
                    axios.get('https://limitless-lowlands-36879.herokuapp.com/reviews/' + this.props.match.params.id)
                        .then(res => {
                            // console.log(res.data);
                            this.setState({ reviews: res.data.reviews, loading: false });
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => {
                    console.log(err);
                });
        };
    };
    render() {
        let redir = null;
        if (this.state.redirectToPendingProducts) {
            redir = <Redirect to="/dashboard/pending-products" />;
        }
        let reviews = null;
        if (this.state.reviews.length > 0) {
            // console.log(this.state.reviews) ;
            reviews = this.state.reviews.map(review => {
                return <ReviewContainer
                    key={review._id}
                    id={review._id}
                    message={review.comments}
                    value={review.value}
                    name={review.user.name}
                    avatar={review.user.name[0]}
                    clicked={() => this.reviewDeleteHandler(review._id)}
                />
            })
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
                    <Grid container spacing={3} style={{ boxShadow: "2px 3px 12px #efefef" }}>
                        <Grid item xs={12}>
                            <Grid container spacing={2} style={{borderBottom : "1px solid lightgrey"}} >
                                <Grid item lg={4}>
                                    <img src={"https://limitless-lowlands-36879.herokuapp.com/" + this.state.product.image} style={{ margin: "12px" }} alt="" className={classes.Image} />
                                </Grid>
                                <Grid item className={classes.VerLine}>
                                </Grid>
                                <Grid item className={classes.Details} lg={6} >
                                    <Grid item >
                                        <h2>{this.state.product.name}</h2>
                                        <p>{this.state.product.description}</p>
                                        <h5>Rs. {this.state.product.price}</h5>
                                        <h6>{this.state.product.category}</h6>
                                        <h6>{this.state.product.sellerID}</h6>
                                        <p>Quantity : {this.state.product.quantity} pcs</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={12}>
                            <Typography variant="h6" style={{ textAlign: "center" }}>All Reviews</Typography>
                            {reviews}
                        </Grid>
                    </Grid> :
                    loading
                }
            </Aux>
        )
    };
};

export default IndividualProdReview;