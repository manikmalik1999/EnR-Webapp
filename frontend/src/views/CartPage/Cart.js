import React,{ Component} from 'react';
import Header from "./HeaderComponent";
import Button from "@material-ui/core/Button";
import Item1 from 'components/images/item1.jpg'
import Item2 from 'components/images/item2.jpg'
import Item3 from 'components/images/item3.jpg'
import Item4 from 'components/images/item4.jpg'
import Item5 from 'components/images/item5.jpg'
import Item6 from 'components/images/item6.jpg'
import {Loading} from './LoadingComponent'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import purple from '@material-ui/core/colors/purple';
import { green,brown,orange,blue,yellow,grey } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Wishlist from './Wishlist'

class Cart extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
            items: [],
            total: 0,
            loading: true,
            check: false
        };
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleAddQ = this.handleAddQ.bind(this);
        this.handleSubQ = this.handleSubQ.bind(this);
        this.handleChecked =this.handleChecked.bind(this);
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
    //to add the quantity
    handleAddQ = (id)=>{
            let addedItem = this.state.items.find(item=> item._id === id)
              addedItem.quantity += 1 
              let newTotal = this.state.total + addedItem.price
              this.setState({
                  total: newTotal
              });
    }
    //to substruct from the quantity
    handleSubQ = (id)=>{
            let addedItem = this.state.items.find(item=> item._id === id) 
            //if the qt == 0 then it should be removed
            if(addedItem.quantity === 1){
                let new_items = this.state.addedItems.filter(item=>item._id !== id)
                let newTotal = this.state.total - addedItem.price
                this.setState({
                  total: newTotal,
                  items: new_items
              });
            }
            else {
                addedItem.quantity -= 1
                let newTotal = this.state.total - addedItem.price
                this.setState({
                    total: newTotal
                });
            }
            
    }

    //to see if the checkbox state changed
    handleChecked = () =>{
        this.setState({check: !this.state.check})
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
                                                        <h3><b>Price: {item.price*item.quantity}$</b></h3>
                                                    </div>
                                                    
                                                </div>
                                                <div className="card-footer" style={{background: `primary`}}>
                                                    <span><Fab size="small" style={{ color: green[500] }} aria-label="add"><AddIcon onClick={()=>{this.handleAddQ(item._id)}}/></Fab> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button variant="outlined" size="large">{item.quantity}</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Fab size="small" style={{ color: purple[500] }} aria-label="remove"><RemoveIcon onClick={()=>{this.handleSubQ(item._id)}} /></Fab> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  </span>
                                                    <Button variant="contained" style={{ color: brown[500] }} onClick={()=>{this.handleRemove(item._id)}}>Remove</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    )
                })
            ):( <p>Nothing.</p>);}
       return(
           
            <div>
                <Header />
                    <div  className="container" style={{ background: blue[200] }}>
                    <div className="e-card e-card-horizontal container-fluid">
                                    <div className="row" >
                                    <div className="col-12 mt-3">
                        <h2>You have ordered:</h2>
                        </div></div></div>
                        {addedItems}
                    </div> 
                    <Wishlist />
                    <div className="e-card e-card-horizontal container-fluid">
                                    <div className="row" style={{ background: grey[100] }}>
                                    <div className="col-12 mt-3">
                    <FormControlLabel control={ <Checkbox color="primary" onChange= {()=>{this.handleChecked()}} icon={<CheckBoxOutlineBlankIcon fontSize="large" />} checkedIcon={<CheckBoxIcon fontSize="large" />} name="checkedI" /> } label="Shipping(+6$)" />
                        <h3><b>Total: {this.state.total} $</b></h3>
                    <div className="checkout">
                        <Button variant="contained" color="secondary" style={{ color: yellow[600] }} href="#"> Checkout </Button>
                    </div>
                    </div></div></div>
            </div>   
       )
    }
}

export default Cart