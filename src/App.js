import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch,Redirect} from "react-router-dom"
import { Index } from './Page/Index';
import { Login } from './Page/Login/Login';
import { Register } from './Page/Login/Register';
import { Detail } from './Page/Detail/detail';
import { Order } from './Page/Order';
import { Address } from './Page/Address';
import { Myorder } from './Page/Myorder';
import { Search } from './Page/search';
import { Oresult } from './Page/Oresult';

export default class App extends Component {
  //render模板  jsx---js和html混写
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login}  />
            <Route path="/oresult" component={Oresult} />
            <Route path="/order" component={Order}  />
            <Route path="/app/:tab?" component={Index} />
            <Route path="/myorder" component={Myorder} />
            <Route path="/search" component={Search} />
            <Route path="/address" component={Address} />
            <Route path="/detail/:goodsid" component={Detail} />
            <Route  render={()=>{
                return <Redirect to="/app/home" />
            }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
