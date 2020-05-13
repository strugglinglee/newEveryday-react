import React, { Component } from 'react';
import {Route,Switch,Redirect} from "react-router-dom"

import { Foot } from '../components/Foot';
import { Home } from './Home/Home';
import { Classify } from './Classify/Classify';
import { Car } from './Car/Car';
import { My } from './My/My';
class Index extends Component {
  //render模板  jsx---js和html混写
  render() {
    return (
        <div style={{height:"100%"}}>
          <Switch>
            <Route path="/app/home" component={Home}></Route>
            <Route path="/app/classify" component={Classify}></Route>
            <Route path="/app/car" component={Car}></Route>
            <Route path="/app/my" component={My}></Route>
            <Route render=  { ()=>(<Redirect to="/app/home" />) } />
          </Switch>
          <Foot {...this.props}/>
        </div>
    );
  }
}
export {Index}