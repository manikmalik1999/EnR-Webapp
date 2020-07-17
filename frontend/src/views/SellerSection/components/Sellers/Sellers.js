import React, { useState, useEffect } from 'react';

import Seller from "./Seller/Seller";
import { Grid } from "@material-ui/core";
import { Dimmer , Loader } from "semantic-ui-react" ;
// import GridContainer from "components/Grid/GridContainer";
// import GridItem from "components/Grid/GridItem.js";

function Sellers(props) {
    const [loading, SetLoading] = useState({
        show: true
    });
    const [sellers, setSellers] = useState({
        sellers: []
    })
    useEffect(() => {
        if (props.sellers && loading.show) {
            SetLoading({
                show: false
            });
            setSellers({
                sellers: props.sellers
            })
        }
    }, [props.sellers])
    // let load = loading.show ;
    let data = (
        <Dimmer active inverted style={{ marginLeft: "150px", width: "100%" }}>
            <Loader size='medium'>Loading</Loader>
        </Dimmer>
    );
    if (!loading.show) {
        let dta = sellers.sellers.map(seller => (
            <Grid key={seller._id} item xs={12} sm={4} lg={3}  >
                <Seller seller={seller} />
            </Grid>
        ))
        data = (
            <Grid container spacing={3} justify='center' >
                {dta}
            </Grid>
        )
    }
    // console.log(data);
    return (
        <div>
            <p style={{ textAlign: "center",fontSize:"24px" }}>Sellers</p>
            {data}
        </div>
    )
}

export default Sellers;