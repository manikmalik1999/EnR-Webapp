import React, { Component } from 'react';
import Axios from 'axios';
import Aux from '../../../hoc/Auxilliary';
import IndividualProdReview from './IndividualProdReview/IndividualProdReview';
import ProductReviews from './ProductReviews/ProductReviews';
import { Dimmer, Loader } from "semantic-ui-react" ;
import { Grid } from "@material-ui/core" ;

const sellerToken = localStorage.getItem("TokenSeller");
class Reviews extends Component {
    state = {
        reviewProducts: [],
        loading: true,
        individualProductId: null
    };

    componentDidMount() {
        Axios({
            method: 'get',
            url: "http://localhost:5000/sellers/products",
            headers: {
              'Authorization': 'Bearer ' + sellerToken,
            }
          })
            .then(response => {
                const products = response.data.product;
                console.log(response);
                const approvedProducts = products.filter(i => {
                    return i.approved === "true";
                });
                this.setState({
                    reviewProducts: approvedProducts,
                    loading: false,
                })
            })
            .catch(err => {
                console.log(err);
            });
    };

    individualReviewHandler = (id) => {
        this.setState({ individualProductId: id });
    }

    render() {
        console.log(this.state.reviewProducts);
        let products = null;
        if (this.state.loading) {
            products = (
                <Dimmer active inverted style={{ marginLeft: "150px", width: "100%" }}>
                    <Loader size='medium'>Loading</Loader>
                </Dimmer>
            )
        }
        else if (!this.state.individualProductId) {
            if( this.state.reviewProducts.length === 0 ){
                products = (
                    <div style={{
                        width:"100%",
                        height:"480px",
                        textAlign:"center",
                        padding:"220px 0px "
                    }}>
                        <h4>No Particular Fulfilling your Request were found.</h4>
                    </div>
                )
            } else {
                const prods = this.state.reviewProducts.map(review => {
                    return (
                        <Grid item xs={12} lg={4} key={review._id}>
                            <ProductReviews
                               id={review._id}
                               title={review.name}
                            //    description={review.product.description}
                               price={review.price}
                               image={review.image}
                               rating = {review.review}
                               clicked={() => this.individualReviewHandler(review._id)}
                           />
                        </Grid>
                    )
                });
                products = (
                    <Grid container spacing={3} justify="center">
                        {prods}
                    </Grid>
                )
            }
        }
        else {
            products = <IndividualProdReview id={this.state.individualProductId} />
        }

        return (
            <div>
                {products}
            </div>
        );
    }
};

export default Reviews;