import React, { Component } from 'react';
import Axios from 'axios';
import Aux from '../../../hoc/Auxilliary';
import Category from './Category/Category';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Dimmer, Loader } from 'semantic-ui-react';

class Categories extends Component {

    state = {
        loading: true,
        categories: []
    }

    componentDidMount() {
        Axios.get('https://limitless-lowlands-36879.herokuapp.com/categories')
            .then(response => {
                // console.log(response);
                this.setState({ categories: response.data.categories, loading: false });
            })
            .catch(err => console.log(err));
    }

    render() {
        let categories;
        if (this.state.loading) {
            categories = (
                <Dimmer active inverted style={{ marginLeft:"150px",width: "100%" }}>
                    <Loader size='medium'>Loading</Loader>
                </Dimmer>
            )
        } else {
            categories = this.state.categories.map(category => {
                return <Grid item xs key={category._id}><Category category={category.category} /></Grid>;
            });
        }

        return (
            <Aux>
                <Grid container spacing={3} style={{ textAlign: "center", verticalAlign: "center", minHeight: "480px" }}>
                    {categories}
                </Grid>
            </Aux>
        );
    }
};

export default Categories;