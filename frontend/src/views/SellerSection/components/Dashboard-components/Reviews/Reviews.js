import React, { Component } from 'react';
import Axios from 'axios';
import Aux from '../../../hoc/Auxilliary';
import IndividualProdReview from './IndividualProdReview/IndividualProdReview';
import ProductReviews from './ProductReviews/ProductReviews';
import { Dimmer, Loader } from "semantic-ui-react" ;
import { Grid } from "@material-ui/core" ;


class Reviews extends Component {
    state = {
        reviewProducts: [],
        loading: true,
        individualProductId: null
    };

    componentDidMount() {
        Axios.get('https://limitless-lowlands-36879.herokuapp.com/reviews')
            .then(response => {
                // console.log(response);
                this.setState({ reviewProducts: response.data.reviews, loading: false });
            })
            .catch(err => {
                console.log(err);
            });
    };

    individualReviewHandler = (id) => {
        this.setState({ individualProductId: id });
    }

    render() {
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
                        <Grid item xs={12} lg={4} key={review.product._id}>
                            <ProductReviews
                               id={review.product._id}
                               title={review.product.name}
                               // description={review.product.description}
                               price={review.product.price}
                               image={review.product.image}
                               clicked={() => this.individualReviewHandler(review.product._id)}
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