import React from 'react';
import Aux from "../../../hoc/Auxilliary" ;
import classes from "./PendingProduct.css" ;
import Card from 'react-bootstrap/Card' ;
// import { Link } from "react-router-dom" ;

const PendingProduct = (props) => {
    const ul = "https://homepuff.com/wp-content/uploads/2018/06/11-31.jpg" ;

    return(
        <Aux>
            <Card style={{ width: '18rem'}} className={classes.Outer}>
                <Card.Img variant="top" className={classes.Image} src={ul} />
                <Card.Body>
                    <hr></hr>
                    <Card.Title className={classes.Title} >{ props.title }</Card.Title>
                    <Card.Text className={classes.Desc}>{ props.desc }</Card.Text>
                    <Card.Text className={classes.Price}>Rs. { props.price }</Card.Text>
                </Card.Body>
            </Card>
        </Aux>
    )
} 

export default PendingProduct;