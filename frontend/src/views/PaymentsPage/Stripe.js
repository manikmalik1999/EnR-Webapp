import React from "react";
import StripeCheckout from "react-stripe-checkout";
import Button from "@material-ui/core/Button";

function Stripe () {
    const product ={"quantity":2,"_id":"5eee46d3440c8009d454c3cb","name":"Hockey stick","description":"Very Very Long","price":29,"category":"sports","sellerId":"ic28345","image":"uploads\\1592674003336hockey Stick.jpg"};
    const makePayment = token => {
        {/*also provide product info  */}
        const body = {
            token,
            product
        }
        const headers ={
            "content-Type": "application/json"
        }
        return fetch(`https://limitless-lowlands-36879.herokuapp.com/payment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log("RESPONSE", response);
            const {status} = response;
            console.log("Status ", status)
        })
        .catch ( error => console.log(error)); 
    }
    return (
        <div className="container">
            {/*we haven't include amount here, fetch from backend if you can.*/}
            <StripeCheckout stripeKey="pk_test_51GxHdEB7zZwux5TfvXX8tVxEVOHbp0mZwtg2WEOnFTusFA5CrKlQWlrQgUdBrXGMw7wFIcv5w3O5DhvPWMkpYklg00cCzNBdUQ" token={makePayment} name="Buy stripe" shippingAddress billingAddress amount = {product.price*100}>
                <Button variant="outlined" size="large">Buy Now</Button>
            </StripeCheckout>
        </div>
    );
}

export default Stripe;