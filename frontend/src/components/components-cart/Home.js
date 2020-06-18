import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import { makeStyles } from "@material-ui/core/styles";
import 'index.css'
import Navbar from './Navbar'
import { CardTitle, CardText } from 'reactstrap';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

 class Home extends Component{
    
    handleClick = (id)=>{
        this.props.addToCart(id); 
    }

    render(){
        let itemList = this.props.items.map(item=>{
            return(
                <Card style={{width: "20rem"}} key={item.id}>
                    <img style={{height: "220px", width: "80%", display: "block"}} src={item.img} alt={item.title}/>
                    <CardBody>
                        <CardTitle>{item.title}</CardTitle>
                        <CardText>
                            <p>{item.desc}</p>
                            <p><b>Price: {item.price}$</b></p>
                        </CardText>
                        <Button color="primary" to="/" onClick={()=>{this.handleClick(item.id)}}><i className="material-icons">add</i></Button>
                    </CardBody>
                </Card>
            )
        })

        return(
            
            <div className="container">
                <Navbar />
                <h3 className="center">Our items</h3>
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
      items: state.items
    }
  }

const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)