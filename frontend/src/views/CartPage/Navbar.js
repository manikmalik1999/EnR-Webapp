import React from 'react';
import { Link } from 'react-router-dom'
import Header from "components/Header/Header";

const dashboardRoutes = [];
 const Navbar = (props)=>{
    const { ...rest } = props;
    return(
            <nav className="nav-wrapper">
                <div className="container">
                <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="EnR E-COMMERCE"
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
                    <Link to="/" className="brand-logo">Shopping</Link>  
                    <ul className="right">
                        <li><Link to="/">Shop</Link></li>
                        <li><Link to="/cart">My cart</Link></li>
                        <li><Link to="/cart"><i className="material-icons">shopping_cart</i></Link></li>
                    </ul>
                </div>
            </nav>  
    )
}

export default Navbar;