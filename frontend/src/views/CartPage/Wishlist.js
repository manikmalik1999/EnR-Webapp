import React,{ Component} from 'react';
import Header from "./HeaderComponent";
import Button from "@material-ui/core/Button";
import Item1 from 'components/images/item1.jpg'
import Item2 from 'components/images/item2.jpg'
import {Loading} from './LoadingComponent'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import purple from '@material-ui/core/colors/purple';
import { green,brown,orange,blue,yellow,grey } from '@material-ui/core/colors';
import { Link } from "react-router-dom";

class Wishlist extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
            items: [],
            total: 0,
            loading: true
        };
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handletoCart = this.handletoCart.bind(this);
    }

    async componentDidMount() {
        const url ='https://tranquil-fortress-57962.herokuapp.com/products';
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
            items: data['products'],
            loading: false
        });
        //calculate the total price of initial products
        if(this.state.items.length)
        {
            this.state.items.map(item=>{
                this.setState({
                    total: this.state.total+item.price
                });
            })
        }
        console.log(data);
    }
    //to remove the item completely
    handleRemove = (id)=>{
        let itemToRemove= this.state.items.find(item=> id === item._id)
        let new_items = this.state.items.filter(item=> id !== item._id)
            
            //calculating the total
            let newTotal = this.state.total - (itemToRemove.price * itemToRemove.quantity )
            console.log(itemToRemove)
            this.setState({
                items: new_items,
                total: newTotal
            });
    }
    handletoCart = (id) =>{
        let itemToMove = this.state.items.find(item=> id === item._id)
        let new_items = this.state.items.filter(item=> id !== item._id)
        this.setState({
            items: new_items,
        })
        //NOTE: we need to put the moved-items in the cart back here.
    }
    render(){
        let addedItems= <Loading />
        if(!this.state.loading) 
            { addedItems = this.state.items.length ?
                (  
                    this.state.items.map(item=>{
                        return(
                            <div key={item._id} style={{ margin: `50px`, display: `flex`, flexDirection: `row`, justifyContent: `center` }}>
                                <div className="e-card e-card-horizontal container-fluid">
                                    <div className="row">
                                        <div className="col-12 mt-3">
                                            <div className="card">
                                                <div className="card-horizontal" style={{display: `flex`,flex: `1 1 auto`}}>
                                                    <div className="img-square-wrapper" >
                                                        <img className="" src={Item1} alt={item.name} style={{ width: `18em`, height: `20em` }} />
                                                    </div>
                                                    <div className="card-body">
                                                        <h4 className="card-title">{item.name}</h4>
                                                        <p className="card-text">{item.description}</p><br/>
                                                        <h3><b>Price: {item.price*item.quantity}$</b></h3><br/>
                                                        <Link onClick={()=>{this.handletoCart(item._id)}} className="link"> Move to Cart</Link>
                                                    </div>                                                   
                                                </div>
                                                <div className="card-footer" style={{background: `primary`}}>
                                                    <span>
                                                        <Fab size="small" style={{ color: green[500] }} aria-label="add" disabled><AddIcon /></Fab> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button variant="outlined" size="large" disabled>{item.quantity}</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Fab size="small" style={{ color: purple[500] }} aria-label="remove" disabled><RemoveIcon /></Fab> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
                                                    </span>
                                                    <Button variant="contained" style={{ color: brown[500] }} onClick={()=>{this.handleRemove(item._id)}}>Remove</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ):<div></div>;
            }
       return(
            <div>
                <div  className="container" style={{ background: grey[200] }}>
                    <div className="e-card e-card-horizontal container-fluid">
                        <div className="row" >
                            <div className="col-12 mt-3">
                                <h2>Saved for Later:</h2>
                            </div>
                        </div>
                    </div>
                    {addedItems}
                </div>
            </div> 
       )
    }
}

export default Wishlist;