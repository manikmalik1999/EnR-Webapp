import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom" ;
import Aux from '../../hoc/Auxilliary';
import Dashboard from '../Dashboard-components/Dashboard';
import LoginSide from "../LoginSide/LoginSide" ;

const layout = (props) => (
    <Aux>
        <Switch>
            <Route path="/login" exact component={LoginSide}></Route>
            <Route path="/dashboard"  component={Dashboard}></Route>
            <Redirect from="/" to={{
                pathname: '/login',
                state: { message : null }
                }}
            />
        </Switch>
    </Aux>
);

export default layout;